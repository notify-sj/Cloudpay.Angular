import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { UserDocuments } from '@/utils/user-documents';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {
  id: string;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: any;
  public documents: UserDocuments[] = [];

  constructor(private userService: UserService,
    private route: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUserDocuments();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true, // Enable responsive design
      autoWidth: false, // Disable auto-width for columns
    };
  }

  getUserDocuments() {
    this.userService.getUserDocuments(parseInt(this.id)).then((result) => {
      this.documents = result;
      setTimeout(function () {
        this.dtTrigger.next();
      }.bind(this));
    });
  }

  view(rec_id: number, type: string, ext: string) {
    this.userService.getUserDocument(parseInt(this.id), rec_id).then(blob => {
      const url = window.URL.createObjectURL(blob);
      if (blob.type != "") {
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.href = URL.createObjectURL(blob);
        a.target = '_blank';
        a.download = type + ext;
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    });
  }

  edit(rec_id: number) {

  }

  delete(rec_id: number) {
    this.userService.deleteDocument(parseInt(this.id), rec_id).then(d => {
      this.getUserDocuments();
    });
  }
}

import { MasterData } from '@/utils/master-data';
import { QueryParamType, Queryparams } from '@/utils/queryparams';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assignment-access',
  templateUrl: './assignment-access.component.html',
  styleUrls: ['./assignment-access.component.scss']
})
export class AssignmentAccessComponent implements OnInit {

  assignmentForm: FormGroup;
  Role: MasterData[] = [];
  Employee: MasterData[] = [];
  OrgType: MasterData[] = [];
  AOrgType: MasterData[] = [];
  OrgDetail: MasterData[] = [];
  AOrgDetail: MasterData[] = [];
  OrgdetIds: Array<number> = [];
  isHidden: boolean = true;
  /**
   *
   */
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService) {
    this.assignmentForm = this.fb.group({
      role: ['', Validators.required],
      employee: ['', Validators.required],
      orgType: ['', Validators.required],
      assignedOrg: ['', Validators.required],
      orgDetail: ['', Validators.required],
      assignedOrgDetail: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.GetMasterData('ROLE');
  }

  GetMasterData(type: string, query: Queryparams[] = []): Promise<void> {
    return this.userService.getMasterData(type, query).then(res => {
      if (type === "ROLE")
        this.Role = res;
      else if (type === "ORGANISATION")
        this.OrgType = res;
      else if (type === "ORGANISATIONDETAIL")
        this.OrgDetail = res;
    });
  }

  onOrgTypeChanged(event: any) {
    this.OrgType = event.left;
    this.AOrgType = event.right;

    this.OrgdetIds = this.AOrgDetail.map(x => x.id);
    this.UpdateDataSource();
  }

  onOrgDetailChanged(event: { left: any[], right: any[] }) {
    this.OrgDetail = event.left;
    this.AOrgDetail = event.right;
  }


  PopulateEmployee(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let query = [
        new Queryparams(QueryParamType.URL, "id", id)
      ];
      this.userService.getEmployeeByRoleId(query).then(res => {
        this.Employee = res;
        this.GetMasterData('ORGANISATION');
        resolve();
      });
    });
  }

  getControl(id) {
    return this.assignmentForm.get(id);
  }

  UpdateDataSource() {
    if (this.AOrgType.length > 0) {
      let data = this.AOrgType.map(x => ({ id: x.id }));
      this.userService.getMasterDataPost("ORGANISATIONDETAIL", data).then(res => {
        this.OrgDetail = res;

        if (this.OrgdetIds.length > 0) {
          this.AOrgDetail = this.OrgDetail.filter(y => this.OrgdetIds.some(z => z == y.id));
          this.OrgDetail = this.OrgDetail.filter(y => !this.OrgdetIds.some(z => z == y.id));
          this.OrgdetIds = [];
        }
      });
    } else {
      this.OrgDetail = [];
      this.AOrgDetail = [];
    }
  }

  OnEmployeeChange() {
    let control = this.getControl('employee');
    if (control) {
      let value = control.value;
      if (value != "") {
        this.OrgType = [];
        this.AOrgType = [];
        this.OrgDetail = [];
        this.AOrgDetail = [];
        this.isHidden = false;
        this.GetMasterData('ORGANISATION').then(x => {
          this.userService.getEmployeeAccessDetail(parseInt(value), parseInt(this.getControl('role').value)).then(res => {
            let OrgIds = res.map(org => org.OrgId);
            OrgIds.forEach(orgId => {
              const index = this.OrgType.findIndex(item => item.id == orgId);
              if (index > -1) {
                const [item] = this.OrgType.splice(index, 1);
                this.AOrgType.push(item);
              }
            });
            this.OrgdetIds = res.map(org => org.OrgDetIds).flat();
            this.UpdateDataSource();
          });
        });
      }
      else
        this.isHidden = true;
    }
  }

  onSubmit() {
    if (this.assignmentForm.dirty) {
      let org = this.AOrgDetail.map(x => ({ OrgId: x.value, OrgDetailId: x.id }));
      this.userService.updateEmployeeAccessDetail(parseInt(this.getControl('employee').value), parseInt(this.getControl('role').value), org);
    }
  }

  onReset() {
    this.assignmentForm.reset();
  }
}

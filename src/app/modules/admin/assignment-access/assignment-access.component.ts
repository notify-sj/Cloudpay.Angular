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

  GetMasterData(type: string, query: Queryparams[] = []) {
    this.userService.getMasterData(type, query).then(res => {
      if (type === "ROLE")
        this.Role = res;
      else if (type === "ORGANISATION")
        this.OrgType = res;
      else if (type === "ORGANISATIONDETAIL")
        this.OrgDetail = res;
    });
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

  reset() {
    this.AOrgType.forEach(x => {
      this.setData(2, x.id, false);
    });
    this.UpdateDataSource();
  }

  private getSource(type) {
    switch (type) {
      case 1:
        return [this.OrgType, this.AOrgType];
      case 2:
        return [this.AOrgType, this.OrgType];

      case 3:
        return [this.OrgDetail, this.AOrgDetail];
      case 4:
        return [this.AOrgDetail, this.OrgDetail];

    }
  }

  getControl(id) {
    return this.assignmentForm.get(id);
  }

  private getControlType(type: number) {
    switch (type) {
      case 1: return this.getControl('orgType');
      case 2: return this.getControl('assignedOrg');
      case 3: return this.getControl('orgDetail');
      case 4: return this.getControl('assignedOrgDetail');
      default: return null; // Default or fallback case
    }
  }

  shift(type: number) {
    let control = this.getControlType(type);
    if (control) {
      let selectedValues = control.value;
      if (selectedValues.length > 0) {
        selectedValues.forEach(x => {
          this.setData(type, parseInt(x), false);
        });

        if ((type == 1 || type == 2))
          this.UpdateDataSource();
      }
    }
  }

  onItemDoubleClick(type: number) {
    let control = this.getControlType(type);
    if (control) {
      let value = control.value;
      this.setData(type, value[0]);
    }
  }

  setData(type: number, id: number, updateData: boolean = true) {
    let [source, destination] = this.getSource(type);
    const index = source.findIndex(item => item.id == id);
    if (index > -1) {
      const [item] = source.splice(index, 1);
      destination.push(item);

      // Update the component's properties to reflect the changes
      this.updateSource(type, source, destination);

      if (updateData && (type == 1 || type == 2)) {
        this.UpdateDataSource();
        if (type == 2) {
          this.AOrgDetail = this.AOrgDetail.filter(ad => this.AOrgType.some(at => at.id?.toString() === ad.value));
        }
      }
    }
  }

  UpdateDataSource(AOrgData: Array<number> = []) {
    if (this.AOrgType.length > 0) {
      let data = this.AOrgType.map(x => ({ id: x.id }));
      this.userService.getMasterDataPost("ORGANISATIONDETAIL", data).then(res => {
        this.OrgDetail = res;
        if (AOrgData.length > 0) {
          AOrgData.forEach(x => {
            this.setData(3, x, false);
          });
        }
      });
    } else {
      this.OrgDetail = [];
      this.AOrgDetail = [];
    }
  }

  private updateSource(type: number, source: MasterData[], destination: MasterData[]) {
    switch (type) {
      case 1:
        this.OrgType = source;
        this.AOrgType = destination;
        break;
      case 2:
        this.AOrgType = source;
        this.OrgType = destination;
        break;
      case 3:
        this.OrgDetail = source;
        this.AOrgDetail = destination;
        break;
      case 4:
        this.AOrgDetail = source;
        this.OrgDetail = destination;
        break;
    }
  }

  OnEmployeeChange() {
    let control = this.getControl('employee');
    if (control) {
      let value = control.value;
      if (value != "") {
        this.isHidden = false;
        this.userService.getEmployeeAccessDetail(parseInt(value), parseInt(this.getControl('role').value)).then(res => {
          this.reset();
          let OrgIds = res.map(org => org.OrgId);
          OrgIds.forEach(x => {
            this.setData(1, parseInt(x), false);
          });
          let OrgdetIds = res.map(org => org.OrgDetIds).flat();
          this.UpdateDataSource(OrgdetIds);
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

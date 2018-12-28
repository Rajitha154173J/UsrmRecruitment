import { Router } from '@angular/router';
import { ProcessDetail } from './../../../Models/processDatail';
import { ProcessService } from './../../service/process.service';
import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../service/data-service.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  processes: ProcessDetail[];
  message: ProcessDetail[];
  constructor(private processService: ProcessService, private data: DataServiceService, private router: Router) {

  }

  ngOnInit() {
    this.processService.getAllProcessDetail().subscribe((result: ProcessDetail[]) => {
      this.processes = result;
      console.log(this.processes);
    });
  }
  deleteProcess(data) {
    console.log(data);
    this.processService.delete(data).subscribe((result: boolean) => {
      if (result) {
        location.reload();
      } else {
        location.reload();
      }
    });

  }

  setvalue(process) {
    // console.log(process);
    // this.data.currentMessage.subscribe(message => this.message = message);
    this.data.changeMessage(process);
    this.router.navigate(['/view-process']);

  }
}

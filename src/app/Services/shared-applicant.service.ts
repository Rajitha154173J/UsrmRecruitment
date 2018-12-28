import {Injectable} from '@angular/core';
import { ExamApplicant } from '../Entities/ExamApplicant';
import { InterviewApplicant } from '../Entities/InterviewApplicant';

@Injectable()
export class SharedApplicantService {

    private config = {};
    private selectedExamApplicant : ExamApplicant;
    private selectedInterviewApplicant : InterviewApplicant;
    public IsExamApplicant : boolean;

    setOption(option:any, value:any) {
        this.config[option] = value;
    }
    getConfig() {
        return this.config;
    }

    getApplicantType(){
        return this.IsExamApplicant;
    }
    setSelectedExamApplicant(applicant:ExamApplicant){
        this.selectedExamApplicant = applicant;
        this.IsExamApplicant = true;
    }

    getSelectedExamApplicant(){
        return this.selectedExamApplicant;
    }

    setSelectedInterviewApplicant(applicant:InterviewApplicant){
        this.IsExamApplicant = false;
        this.selectedInterviewApplicant = applicant;
    }
    getSelectedInterviewApplicant(){
        return this.selectedInterviewApplicant;
    }
}
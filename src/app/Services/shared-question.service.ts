import {Injectable} from '@angular/core';
import { QuestionDTO } from '../Entities/QuestionDTO';


@Injectable()
export class SharedQuestionService {

    private config = {};
    private selectedQuestion : QuestionDTO;


    setOption(option:any, value:any) {
        this.config[option] = value;
    }
    getConfig() {
        return this.config;
    }

    setSelectedQuestion(question:QuestionDTO){
        this.selectedQuestion = question;
    }
    getSelectedQuestion(){
        return this.selectedQuestion;
    }
}
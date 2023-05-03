import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { TimesheetFormControls } from 'src/app/forms/timesheet.form';
import { v4 as uuidv4 } from 'uuid';

interface FormControls {
    date: FormControl<Date | null>;
    timesheets: FormArray<FormGroup<TimesheetFormControls>>;
}

interface Client {
    id: string;
    name: string;
}

interface Project {
    id: string;
    name: string;   
    client: Client;
}

interface Task {
    id: string;
    name: string;
    project: Project;
}

@Component({
    selector: 'app-time-entry',
    templateUrl: './time-entry.component.html',
    styleUrls: ['./time-entry.component.scss']
})
export class TimeEntryComponent implements OnInit {
    loading = false;

    pss: Client = {
        id: uuidv4(),
        name: 'PSS'
    }

    jlg: Client = {
        id: uuidv4(),
        name: 'JLG'
    }

    rosch: Client = {
        id: uuidv4(),
        name: 'Rosch'
    }

    project1: Project = {
        id: uuidv4(),
        name: 'Portal',   
        client: {...this.pss}
    }

    project2: Project = {
        id: uuidv4(),
        name: 'Website',   
        client: {...this.pss}
    }

    project3: Project = {
        id: uuidv4(),
        name: 'Data Migration',
        client: {...this.jlg}
    }

    project4: Project = {
        id: uuidv4(),
        name: 'Power BI',   
        client: {...this.jlg}
    }

    project5: Project = {
        id: uuidv4(),
        name: 'Immunotherapy Rewrite',   
        client: {...this.rosch}
    }

    project6: Project = {
        id: uuidv4(),
        name: 'Skin Testing Rewrite',   
        client: {...this.rosch}
    }    

    projects: Project[] = [
        {...this.project1}, 
        {...this.project2},
        {...this.project3}, 
        {...this.project4},
        {...this.project5}, 
        {...this.project6},
    ]

    tasks: Task[] = [];

    forms = new FormGroup<FormControls>({
        date: new FormControl(new Date()),
        timesheets: new FormArray<FormGroup<TimesheetFormControls>>([])
    });

    constructor() { }

    ngOnInit(): void {
        this.getTasks();
        this.getTimesheets();
    }

    getTasks(): void {
        this.projects.forEach(project => {
            const devTask: Task = {
                id: uuidv4(),
                name: `${project.name} Dev`,
                project: {...project},
            }

            const qaTask: Task = {
                id: uuidv4(),
                name: `${project.name} QA`,
                project: {...project},
            }

            const baTask: Task = {
                id: uuidv4(),
                name: `${project.name} BA`,
                project: {...project},
            }

            this.tasks.push(
                {...devTask},
                {...qaTask},
                {...baTask},
            );
        });
    }

    getTimesheets(): void {
        this.tasks.forEach(task => this.forms.controls.timesheets.push(this.createTimesheet(task)));
    }

    createTimesheet(task: Task): FormGroup<TimesheetFormControls> {
        return new FormGroup<TimesheetFormControls>({
            id: new FormControl(uuidv4()),
            taskId: new FormControl(task.id, {nonNullable: true}),
            hours: new FormControl(0),
        });
    }
}

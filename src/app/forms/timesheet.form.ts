import { FormControl } from "@angular/forms";

export interface TimesheetFormControls {
    id: FormControl<string | null>;
    taskId: FormControl<string>;
    hours: FormControl<number | null>;
}

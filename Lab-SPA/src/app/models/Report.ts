export class Report{
    ReportID :number;
    PatientID :number;
    DoctorID :number;
    CID :number;
    CreatedBy :string;
    CreatedDate :Date;
    isbtnDisabled: boolean;
    Status:string;
   }

export class ReportDetails{
    RptDetailsID :number;
    ReportID :number;
    GroupId :number; 
    TestId:number;
    TestValue :string;
}
export class ReportData
{
    Report :Report;
    ReportDetails :ReportDetails[];
}
export class AllReportsInfo{
    reportID :number; 
    patientName :string; 
    doctorName :string; 
    status :string; 
    createdDate:Date;  
}
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
    isHighlight:boolean;
}
export class ReportData
{
    Report :Report;
    ReportDetails :ReportDetails[];
}

export class AllReportsInfo{

    reportID :number; 
    patientName :string; 
    patientDOB :string; 
    patientGender :string; 
    doctorName :string; 
    status :string; 
    createdDate:Date;  
}
export class ReportInfo{
    rptDetailsID:number; 
    groupName:string; 
    TestId:number;
    testName:string; 
    result:string; 
    normalRange:string;
    isHighlight:boolean;
   }
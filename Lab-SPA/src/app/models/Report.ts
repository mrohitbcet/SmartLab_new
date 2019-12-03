export class Report{
    ReportID :number;
    PatientID :number;
    DoctorID :number;
    CID :number;
    CreatedBy :string;
    CreatedDate :Date;
    isbtnDisabled: boolean;
    Status:string;
    specimen:string
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
    email:string;
    patientDOB :string; 
    patientGender :string; 
    doctorName :string; 
    status :string; 
    createdDate:Date;  
    specimen:string;
}
export class ReportInfo{
    rptDetailsID:number; 
    groupName:string; 
    HideNormalvalue:boolean;
    subId:number;
    TestId:number;
    unit:string;
    testName:string; 
    result:string; 
    normalRange:string;
    isHighlight:boolean;
   }

   export class ReportToEmail{
       ReportNo:number;
       ClientName:string;
       Address:string;
       PatientName:string;
       AgeGender:string;
       RefBy:string;
       CollectionDate:Date;
       Specimen:string;
    ReportInfo :ReportInfo[];
   }
   export class ReportDataGroupWise
{
    GroupName :string;
    hideNormalvalue:boolean;
    ReportInfo :ReportInfo[];
}
export class HtmlToEmail{
    content:string;
    toemail:string;
}
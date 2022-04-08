import {DatePipe} from "@angular/common";

export function toDateString(date: Date): string {
  try {
    if (date) {
      const datePipe: DatePipe = new DatePipe('en-US')
      let dateString = datePipe.transform(date, 'dd-MMM-YYYY HH:mm:ss a')

      if (!!dateString) {
        return dateString;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return "Not Dated";
}

export function isObjectNullOrEmpty (obj:any){
  if (!obj) {
    return true;
  }

  if (Object.keys(obj).length === 0) {
   return true;
  }

  return false;
}

export function getUserAgentBasedStyle(style1:string, style2:string, mobile: boolean) {
  if (mobile){
    return `${style1} ${style2}-mobile`;
  }

  return `${style1} ${style2}`;
}
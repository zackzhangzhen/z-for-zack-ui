import {DatePipe} from "@angular/common";
import {POINT_SYSTEM} from "../constants/constants";
import {User} from "../models/user";
import {BlogCard} from "../models/blog-card";

export function toDateString(date: Date): string {
  try {
    if (date) {
      const datePipe: DatePipe = new DatePipe('en-US')
      let dateString = datePipe.transform(date, 'dd-MMM-YYYY HH:mm a')

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

export function deleteFromArray(element: any, arr: any[]){
  if (!element || !arr || arr.length == 0) {
    return;
  }
  const index = arr.indexOf(element, 0);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export function processPointsForLike(blog: BlogCard, user: User, cancelLike: boolean){
  if (cancelLike){
    blog.likes--;
    user.likes--;
    user.credits+= POINT_SYSTEM.CANCEL_BLOG_LIKE;
  } else {
    blog.likes++;
    user.likes++;
    user.credits+= POINT_SYSTEM.BLOG_LIKE;
  }
}

export function isVideo(fileName:string) {
  if (!fileName) {
    return false;
  }

  let index = fileName.lastIndexOf('.');

  if (index < 0) {
    return false;
  }

  let ext = fileName.substr(index+1);

  if (ext.toUpperCase() === 'MOV'.toUpperCase() ||
    ext.toUpperCase() === 'MP4'.toUpperCase() ||
    ext.toUpperCase() === 'WMV'.toUpperCase() ||
    ext.toUpperCase() === 'AVI'.toUpperCase() ||
    ext.toUpperCase() === 'MKV'.toUpperCase() ||
    ext.toUpperCase() === 'FLV'.toUpperCase() ||
    ext.toUpperCase() === 'MPEG-2'.toUpperCase() ||
    ext.toUpperCase() === 'AVCHD'.toUpperCase() ||
    ext.toUpperCase() === 'SWF'.toUpperCase()) {
    return true;
  }

  return false;
}

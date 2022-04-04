import {Injectable} from '@angular/core';
import {BlogCard} from "../models/blog-card";
import {HttpClient} from '@angular/common/http';
import {NODE_JS_BASE_URL} from "../constants/constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogCards = [
    {
      date: new Date(),
      title: "What is ESPN exactly?",
      text: "ESPN (originally an initialism for Entertainment and Sports Programming Network)[1] is an American international basic cable sports channel owned by ESPN Inc., " +
        "owned jointly by The Walt Disney Company (80%) and Hearst Communications (20%). The company was founded in 1979 by Bill Rasmussen along with his son Scott Rasmussen " +
        "and Ed Eagan.\n\n" +
        "ESPN broadcasts primarily from studio facilities located in Bristol, Connecticut. The network also operates offices and auxiliary studios in Miami, New York City, " +
        "Las Vegas, Seattle, Charlotte, Washington, D.C., and Los Angeles. James Pitaro currently serves as chairman of ESPN, a position he has held since March 5, 2018, following " +
        "the resignation of John Skipper on December 18, 2017.[2] While ESPN is one of the most successful sports networks, there has been criticism of ESPN. This includes accusations " +
        "of biased coverage,[3] conflict of interest, and controversies with individual broadcasters and analysts. ",
      liked: false,
    },
    {
      date: new Date('1995-12-17T03:24:00'),
      title: "This flick is pretty good heh?",
      text: "Bill Rasmussen came up with the concept of ESPN in May 1978, after he was fired from his job with the World Hockey Association's New England Whalers. One of the first steps in Bill and his son Scott's (who had also been let go by the Whalers) process was finding land to build the channel's broadcasting facilities. The Rasmussens first rented office space in Plainville, Connecticut. However, the plan to base ESPN there was put on hold because of a local ordinance prohibiting buildings from bearing rooftop satellite dishes. Available land area was quickly found in Bristol, Connecticut (where the channel remains headquartered to this day), with funding to buy the property provided by Getty Oil, which purchased 85% of the company from Bill Rasmussen on February 22, 1979, in an attempt to diversify the company's holdings. This helped the credibility of the fledgling company; however, there were still many doubters to the viability of their sports channel concept. Another event that helped build ESPN's credibility was securing an advertising agreement with Anheuser-Busch in the spring of 1979; the company invested $1 million to be the exclusive beer advertised on the network.[6][7] ",
      liked: true,
    },
    {
      date: new Date('2017-10-17T01:50:02'),
      title: "Phineas and Ferb are good kids!",
      text: "The show follows the adventures of stepbrothers Phineas Flynn and Ferb Fletcher, who live in the fictional city of Danville in an unspecified tri-state area, as they seek ways to occupy their time during their summer vacation. Often these adventures involve elaborate, life-sized and ostensibly dangerous construction projects. Phineas' older sister Candace Flynn has two obsessions: exposing Phineas and Ferb's schemes and ideas, and winning the attention of a boy named Jeremy.[5] Meanwhile, the boys' pet platypus Perry, acts as a secret agent for an all-animal government organization[6][7] called the O.W.C.A. (\"Organization Without a Cool Acronym\"), fighting Dr. Heinz Doofenshmirtz.[8]\n" +
        "\n" +
        "Much of the series' humor relies on running gags used in almost every episode, with slight variation.",
      liked: true,
    },
    {
      date: new Date(),
      title: "What is ESPN exactly?",
      text: "ESPN (originally an initialism for Entertainment and Sports Programming Network)[1] is an American international basic cable sports channel owned by ESPN Inc., " +
        "owned jointly by The Walt Disney Company (80%) and Hearst Communications (20%). The company was founded in 1979 by Bill Rasmussen along with his son Scott Rasmussen " +
        "and Ed Eagan.\n\n" +
        "ESPN broadcasts primarily from studio facilities located in Bristol, Connecticut. The network also operates offices and auxiliary studios in Miami, New York City, " +
        "Las Vegas, Seattle, Charlotte, Washington, D.C., and Los Angeles. James Pitaro currently serves as chairman of ESPN, a position he has held since March 5, 2018, following " +
        "the resignation of John Skipper on December 18, 2017.[2] While ESPN is one of the most successful sports networks, there has been criticism of ESPN. This includes accusations " +
        "of biased coverage,[3] conflict of interest, and controversies with individual broadcasters and analysts. ",
      liked: true,
    },
    {
      date: new Date('1995-12-17T03:24:00'),
      title: "This flick is pretty good heh?",
      text: "Bill Rasmussen came up with the concept of ESPN in May 1978, after he was fired from his job with the World Hockey Association's New England Whalers. One of the first steps in Bill and his son Scott's (who had also been let go by the Whalers) process was finding land to build the channel's broadcasting facilities. The Rasmussens first rented office space in Plainville, Connecticut. However, the plan to base ESPN there was put on hold because of a local ordinance prohibiting buildings from bearing rooftop satellite dishes. Available land area was quickly found in Bristol, Connecticut (where the channel remains headquartered to this day), with funding to buy the property provided by Getty Oil, which purchased 85% of the company from Bill Rasmussen on February 22, 1979, in an attempt to diversify the company's holdings. This helped the credibility of the fledgling company; however, there were still many doubters to the viability of their sports channel concept. Another event that helped build ESPN's credibility was securing an advertising agreement with Anheuser-Busch in the spring of 1979; the company invested $1 million to be the exclusive beer advertised on the network.[6][7] ",
      liked: true,

    },
    {
      date: new Date('2017-10-17T01:50:02'),
      title: "Phineas and Ferb are good kids!",
      text: "The show follows the adventures of stepbrothers Phineas Flynn and Ferb Fletcher, who live in the fictional city of Danville in an unspecified tri-state area, as they seek ways to occupy their time during their summer vacation. Often these adventures involve elaborate, life-sized and ostensibly dangerous construction projects. Phineas' older sister Candace Flynn has two obsessions: exposing Phineas and Ferb's schemes and ideas, and winning the attention of a boy named Jeremy.[5] Meanwhile, the boys' pet platypus Perry, acts as a secret agent for an all-animal government organization[6][7] called the O.W.C.A. (\"Organization Without a Cool Acronym\"), fighting Dr. Heinz Doofenshmirtz.[8]\n" +
        "\n" +
        "Much of the series' humor relies on running gags used in almost every episode, with slight variation.",
      liked: false,
    },
  ] as BlogCard[];


  blogsPerPage: number = 5;

  constructor(private http: HttpClient) { }

  getBlogs(pageNumber: number, perPage?: number): Observable<BlogCard[]> {

    return this.http.get<BlogCard[]>(`${NODE_JS_BASE_URL}blogs?page=${pageNumber}` + `${perPage && `&limit=${perPage}` || ''}`)
  }

  getBlogsMock(pageNumber?: number): BlogCard[] {
    return this.blogCards;
  }
}

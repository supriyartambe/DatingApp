import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-datail',
  templateUrl: './member-datail.component.html',
  styleUrls: ['./member-datail.component.css']
})
export class MemberDatailComponent implements OnInit {
member:Member;
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];

  constructor(private memberSerice:MembersService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
    this.galleryOptions=[

      {
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Slide,
        preview:false
      }
    ]

  }

  getImages():NgxGalleryImage[]{
    const imgUrls=[];
    for(const photo of this.member.photos){
      imgUrls.push({
        small:photo?.url,
        medium:photo?.url,
        big:photo?.url
      })
    }
    return imgUrls;

  }
  loadMember(){
    this.memberSerice.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member=>
      {
        this.member=member;
        this.galleryImages=this.getImages();
      })
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogContentComponent } from './blog-content.component';


const contentBlog = {
  "content": [
    {
      "type": "brxm:ImageCompound",
      "value": {
        "content": {
          "image": {
            "contentType": "brxm:ImageCompound",
            "altText": "",
            "link": "",
            "title": "",
            "imageBRE": null,
            "imageDAMUrl": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000951_room_02?scl=6&wid=1200&hei=850&align=.9,.6"
          }
        },
        "presentation": {
          "theme": "light"
        }
      }
    },
    {
      "type": "hippostd:html",
      "value": {
        "content": {
          "richText": "<h2>Blog 6</h2>\n\n<p>Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothchola sit.Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothchola sit.tempar tomar amr pothchola sit.Lorem ipsum dolor situpupamet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est kochu patar pani aborum.</p>"
        },
        "presentation": {
          "theme": "light"
        }
      }
    },
    {
      "type": "brxm:ProductImageCompound",
      "value": {
        "content": {
          "productName": "Lorem ipsum",
          "productColor": "Lorem ipsum",
          "productImage": {
            "contentType": "brxm:ImageCompound",
            "altText": "",
            "link": "",
            "title": "",
            "imageBRE": null,
            "imageDAMUrl": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000951_room_02?scl=6&wid=1200&hei=850&align=.9,.6"
          },
          "productUrl": {
            "presentation": {
              "buttonType": "primary",
              "textAlign": null,
              "iconStroke": null,
              "iconPosition": null
            },
            "content": {
              "link": null,
              "target": null,
              "text": "Shop Product",
              "url": ""
            }
          }
        },
        "presentation": {
          "theme": "light"
        }
      }
    },
    {
      "type": "hippostd:html",
      "value": {
        "content": {
          "richText": "<p>Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothchola sit.Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothchola sit.tempar tomar amr pothchola sit.Lorem ipsum dolor situpupamet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est kochu patar pani aborum.</p>"
        },
        "presentation": {
          "theme": "light"
        }
      }
    }
  ]
};

describe('BlogContentComponent', () => {
  let component: BlogContentComponent;
  let fixture: ComponentFixture<BlogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Blog Content Created',  () => {
    component.blogContentContent$.subscribe(value => {
     expect(value).toEqual(contentBlog);
  });

})

});

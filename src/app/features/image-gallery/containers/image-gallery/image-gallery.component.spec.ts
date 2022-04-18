import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImageGalleryComponent } from './image-gallery.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BloomreachBaseClass } from '@app/core/bloomreach';
import { ImageGalleryMapper } from './image-gallery.mapper';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
describe('ImageGalleryComponent', () => {
    let component: ImageGalleryComponent;
    let fixture: ComponentFixture<ImageGalleryComponent>;
    const mockData = {
        "id": "17b26575-c4de-45f8-a50d-0cf346414f34",
        "_meta": {},
        "_links": {
            "site": {
                "href": "/site/mf/discover/image-gallery",
                "type": "internal"
            }
        },
        "name": "mf-image-gallery",
        "displayName": "MF Image Gallery",
        "gallery": [
            {
                "name": "brxm:gallery",
                "displayName": "brxm:gallery",
                "productName": "Product Name",
                "style": "style1",
                "image": {
                    "name": "brxm:image",
                    "displayName": "brxm:image",
                    "link": "https://www.google.com",
                    "title": "Image Title",
                    "imageDAM": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000909_room_01?scl=5.5&wid=1200&hei=850&align=0,1",
                    "altText": "alt text",
                    "imageBRE": null,
                    "contentType": "brxm:ImageCompound"
                },
                "floorType": "floorType1",
                "floorLook": "floorLook1",
                "floorColor": "floorColor1",
                "cta": {
                    "name": "brxm:cta",
                    "displayName": "brxm:cta",
                    "text": "CTA text",
                    "link": null,
                    "button": "primary",
                    "url": "https://www.google.com",
                    "icon": null,
                    "alignment": null,
                    "iconStroke": null,
                    "iconStyle": null,
                    "target": "\"\"",
                    "contentType": "brxm:LinkCompound"
                },
                "color": "Product Color (Cherry)",
                "sku": "000SKU001",
                "roomType": "room2",
                "contentType": "brxm:MFProductImageGalleryItemCompound"
            },
            {
                "name": "brxm:gallery",
                "displayName": "brxm:gallery",
                "productName": "Product 2",
                "style": "style2",
                "image": {
                    "name": "brxm:image",
                    "displayName": "brxm:image",
                    "link": "https://www.google.com",
                    "title": "Image Title",
                    "imageDAM": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000842_room_01?scl=5.5&wid=1200&hei=850&align=0,1",
                    "altText": "alt text",
                    "imageBRE": null,
                    "contentType": "brxm:ImageCompound"
                },
                "floorType": "floorType1",
                "floorLook": "floorLook2",
                "floorColor": "floorColor2",
                "cta": {
                    "name": "brxm:cta",
                    "displayName": "brxm:cta",
                    "text": "CTA Text",
                    "link": null,
                    "button": "secondary",
                    "url": "https://www.google.com",
                    "icon": null,
                    "alignment": null,
                    "iconStroke": null,
                    "iconStyle": null,
                    "target": "\"\"",
                    "contentType": "brxm:LinkCompound"
                },
                "color": "Product Color 2",
                "sku": "000SKU002",
                "roomType": "room2",
                "contentType": "brxm:MFProductImageGalleryItemCompound"
            },
            {
                "name": "brxm:gallery",
                "displayName": "brxm:gallery",
                "productName": "Product Name 3",
                "style": "style2",
                "image": {
                    "name": "brxm:image",
                    "displayName": "brxm:image",
                    "link": "",
                    "title": "",
                    "imageDAM": "https://s7d4.scene7.com/is/image/MohawkResidential/PT002_942_00?scl=3&wid=1200&hei=850&align=-.9,.6",
                    "altText": "",
                    "imageBRE": null,
                    "contentType": "brxm:ImageCompound"
                },
                "floorType": "floorType2",
                "floorLook": "floorLook1",
                "floorColor": "floorColor1",
                "cta": {
                    "name": "brxm:cta",
                    "displayName": "brxm:cta",
                    "text": "Read More",
                    "link": null,
                    "button": "primary",
                    "url": "",
                    "icon": null,
                    "alignment": null,
                    "iconStroke": null,
                    "iconStyle": null,
                    "target": null,
                    "contentType": "brxm:LinkCompound"
                },
                "color": "Product color 3",
                "sku": "3",
                "roomType": "room1",
                "contentType": "brxm:MFProductImageGalleryItemCompound"
            },
            {
                "name": "brxm:gallery",
                "displayName": "brxm:gallery",
                "productName": "Product Name 4",
                "style": "style1",
                "image": {
                    "name": "brxm:image",
                    "displayName": "brxm:image",
                    "link": "",
                    "title": "",
                    "imageDAM": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000940_room_01?scl=6&wid=1200&hei=850&align=-.5,-.9",
                    "altText": "",
                    "imageBRE": null,
                    "contentType": "brxm:ImageCompound"
                },
                "floorType": "floorType3",
                "floorLook": "floorLook2",
                "floorColor": "floorColor1",
                "cta": {
                    "name": "brxm:cta",
                    "displayName": "brxm:cta",
                    "text": "Read More",
                    "link": null,
                    "button": "primary",
                    "url": "",
                    "icon": null,
                    "alignment": null,
                    "iconStroke": null,
                    "iconStyle": null,
                    "target": null,
                    "contentType": "brxm:LinkCompound"
                },
                "color": "Product color 4",
                "sku": "4",
                "roomType": "room2",
                "contentType": "brxm:MFProductImageGalleryItemCompound"
            },
            {
                "name": "brxm:gallery",
                "displayName": "brxm:gallery",
                "productName": "Product Name 5",
                "style": "style1",
                "image": {
                    "name": "brxm:image",
                    "displayName": "brxm:image",
                    "link": "",
                    "title": "",
                    "imageDAM": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000951_room_02?scl=6&wid=1200&hei=850&align=.9,.6",
                    "altText": "",
                    "imageBRE": null,
                    "contentType": "brxm:ImageCompound"
                },
                "floorType": "floortype4",
                "floorLook": "floorlook3",
                "floorColor": "floorColor2",
                "cta": {
                    "name": "brxm:cta",
                    "displayName": "brxm:cta",
                    "text": "Read More",
                    "link": null,
                    "button": "primary",
                    "url": "",
                    "icon": null,
                    "alignment": null,
                    "iconStroke": null,
                    "iconStyle": null,
                    "target": null,
                    "contentType": "brxm:LinkCompound"
                },
                "color": "Product color 5",
                "sku": "5",
                "roomType": "room5",
                "contentType": "brxm:MFProductImageGalleryItemCompound"
            },
            {
                "name": "brxm:gallery",
                "displayName": "brxm:gallery",
                "productName": "Product Name 6",
                "style": "style2",
                "image": {
                    "name": "brxm:image",
                    "displayName": "brxm:image",
                    "link": "",
                    "title": "",
                    "imageDAM": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000879_room_01?scl=5&wid=1200&hei=850&align=.9,.6",
                    "altText": "",
                    "imageBRE": null,
                    "contentType": "brxm:ImageCompound"
                },
                "floorType": "floorType3",
                "floorLook": "floorlook3",
                "floorColor": "floorColor1",
                "cta": {
                    "name": "brxm:cta",
                    "displayName": "brxm:cta",
                    "text": "Read More",
                    "link": null,
                    "button": "primary",
                    "url": "",
                    "icon": null,
                    "alignment": null,
                    "iconStroke": null,
                    "iconStyle": null,
                    "target": null,
                    "contentType": "brxm:LinkCompound"
                },
                "color": "Product color 6",
                "sku": "6",
                "roomType": "room7",
                "contentType": "brxm:MFProductImageGalleryItemCompound"
            },
            {
                "name": "brxm:gallery",
                "displayName": "brxm:gallery",
                "productName": "Product Name 7",
                "style": "style1",
                "image": {
                    "name": "brxm:image",
                    "displayName": "brxm:image",
                    "link": "",
                    "title": "",
                    "imageDAM": "https://s7d4.scene7.com/is/image/MohawkResidential/PT004-01_room_01?scl=6.1&wid=1200&hei=850&align=0,1",
                    "altText": "",
                    "imageBRE": null,
                    "contentType": "brxm:ImageCompound"
                },
                "floorType": "floorType2",
                "floorLook": "floorLook2",
                "floorColor": "floorColor1",
                "cta": {
                    "name": "brxm:cta",
                    "displayName": "brxm:cta",
                    "text": "Read More",
                    "link": null,
                    "button": "primary",
                    "url": "",
                    "icon": null,
                    "alignment": null,
                    "iconStroke": null,
                    "iconStyle": null,
                    "target": null,
                    "contentType": "brxm:LinkCompound"
                },
                "color": "Product color 7",
                "sku": "7",
                "roomType": "room2",
                "contentType": "brxm:MFProductImageGalleryItemCompound"
            },
            {
                "name": "brxm:gallery",
                "displayName": "brxm:gallery",
                "productName": "Product Name 8",
                "style": "style1",
                "image": {
                    "name": "brxm:image",
                    "displayName": "brxm:image",
                    "link": "",
                    "title": "",
                    "imageDAM": "https://s7d4.scene7.com/is/image/MohawkResidential/PT001-440_room_01?scl=3.8&wid=1200&hei=850&align=0,0",
                    "altText": "",
                    "imageBRE": null,
                    "contentType": "brxm:ImageCompound"
                },
                "floorType": "floorType1",
                "floorLook": "floorlook3",
                "floorColor": "floorColor2",
                "cta": {
                    "name": "brxm:cta",
                    "displayName": "brxm:cta",
                    "text": "Read More",
                    "link": null,
                    "button": null,
                    "url": "",
                    "icon": null,
                    "alignment": null,
                    "iconStroke": null,
                    "iconStyle": null,
                    "target": null,
                    "contentType": "brxm:LinkCompound"
                },
                "color": "Product Color 8",
                "sku": "8",
                "roomType": "room6",
                "contentType": "brxm:MFProductImageGalleryItemCompound"
            }
        ],
        "localeString": "en",
        "contentType": "brxm:MFImageGallery"
    };
    const imagesMapped = [
        {
            "order": 1,
            "sku": "000SKU001",
            "color": "Product Color (Cherry)",
            "name": "Product Name",
            "cta": {
                "content": {
                    "button": "primary",
                    "link": null,
                    "target": "\"\"",
                    "text": "CTA text",
                    "url": "https://www.google.com",
                    "alignment": null
                },
                "presentation": {
                    "buttonType": "primary"
                }
            },
            "image": {
                "content": {
                    "desktop": {
                        "altText": "alt text",
                        "link": "https://www.google.com",
                        "title": "Image Title",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000909_room_01?scl=5.5&wid=1200&hei=850&align=0,1"
                        }
                    },
                    "mobile": {
                        "altText": "alt text",
                        "link": "https://www.google.com",
                        "title": "Image Title",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000909_room_01?scl=5.5&wid=1200&hei=850&align=0,1"
                        }
                    }
                },
                "presentation": {
                    "theme": "light"
                }
            },
            "filters": {
                "roomType": "room2",
                "floorType": "floorType1",
                "floorLook": "floorLook1",
                "floorColor": "floorColor1",
                "style": "style1"
            }
        },
        {
            "order": 2,
            "sku": "000SKU002",
            "color": "Product Color 2",
            "name": "Product 2",
            "cta": {
                "content": {
                    "button": "secondary",
                    "link": null,
                    "target": "\"\"",
                    "text": "CTA Text",
                    "url": "https://www.google.com",
                    "alignment": null
                },
                "presentation": {
                    "buttonType": "secondary"
                }
            },
            "image": {
                "content": {
                    "desktop": {
                        "altText": "alt text",
                        "link": "https://www.google.com",
                        "title": "Image Title",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000842_room_01?scl=5.5&wid=1200&hei=850&align=0,1"
                        }
                    },
                    "mobile": {
                        "altText": "alt text",
                        "link": "https://www.google.com",
                        "title": "Image Title",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000842_room_01?scl=5.5&wid=1200&hei=850&align=0,1"
                        }
                    }
                },
                "presentation": {
                    "theme": "light"
                }
            },
            "filters": {
                "roomType": "room2",
                "floorType": "floorType1",
                "floorLook": "floorLook2",
                "floorColor": "floorColor2",
                "style": "style2"
            }
        },
        {
            "order": 3,
            "sku": "3",
            "color": "Product color 3",
            "name": "Product Name 3",
            "cta": {
                "content": {
                    "button": "primary",
                    "link": null,
                    "target": null,
                    "text": "Read More",
                    "url": "",
                    "alignment": null
                },
                "presentation": {
                    "buttonType": "primary"
                }
            },
            "image": {
                "content": {
                    "desktop": {
                        "altText": "",
                        "link": "",
                        "title": "",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/PT002_942_00?scl=3&wid=1200&hei=850&align=-.9,.6"
                        }
                    },
                    "mobile": {
                        "altText": "",
                        "link": "",
                        "title": "",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/PT002_942_00?scl=3&wid=1200&hei=850&align=-.9,.6"
                        }
                    }
                },
                "presentation": {
                    "theme": "light"
                }
            },
            "filters": {
                "roomType": "room1",
                "floorType": "floorType2",
                "floorLook": "floorLook1",
                "floorColor": "floorColor1",
                "style": "style2"
            }
        },
        {
            "order": 4,
            "sku": "4",
            "color": "Product color 4",
            "name": "Product Name 4",
            "cta": {
                "content": {
                    "button": "primary",
                    "link": null,
                    "target": null,
                    "text": "Read More",
                    "url": "",
                    "alignment": null
                },
                "presentation": {
                    "buttonType": "primary"
                }
            },
            "image": {
                "content": {
                    "desktop": {
                        "altText": "",
                        "link": "",
                        "title": "",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000940_room_01?scl=6&wid=1200&hei=850&align=-.5,-.9"
                        }
                    },
                    "mobile": {
                        "altText": "",
                        "link": "",
                        "title": "",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000940_room_01?scl=6&wid=1200&hei=850&align=-.5,-.9"
                        }
                    }
                },
                "presentation": {
                    "theme": "light"
                }
            },
            "filters": {
                "roomType": "room2",
                "floorType": "floorType3",
                "floorLook": "floorLook2",
                "floorColor": "floorColor1",
                "style": "style1"
            }
        },
        {
            "order": 5,
            "sku": "5",
            "color": "Product color 5",
            "name": "Product Name 5",
            "cta": {
                "content": {
                    "button": "primary",
                    "link": null,
                    "target": null,
                    "text": "Read More",
                    "url": "",
                    "alignment": null
                },
                "presentation": {
                    "buttonType": "primary"
                }
            },
            "image": {
                "content": {
                    "desktop": {
                        "altText": "",
                        "link": "",
                        "title": "",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000951_room_02?scl=6&wid=1200&hei=850&align=.9,.6"
                        }
                    },
                    "mobile": {
                        "altText": "",
                        "link": "",
                        "title": "",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000951_room_02?scl=6&wid=1200&hei=850&align=.9,.6"
                        }
                    }
                },
                "presentation": {
                    "theme": "light"
                }
            },
            "filters": {
                "roomType": "room5",
                "floorType": "floortype4",
                "floorLook": "floorlook3",
                "floorColor": "floorColor2",
                "style": "style1"
            }
        },
        {
            "order": 6,
            "sku": "6",
            "color": "Product color 6",
            "name": "Product Name 6",
            "cta": {
                "content": {
                    "button": "primary",
                    "link": null,
                    "target": null,
                    "text": "Read More",
                    "url": "",
                    "alignment": null
                },
                "presentation": {
                    "buttonType": "primary"
                }
            },
            "image": {
                "content": {
                    "desktop": {
                        "altText": "",
                        "link": "",
                        "title": "",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000879_room_01?scl=5&wid=1200&hei=850&align=.9,.6"
                        }
                    },
                    "mobile": {
                        "altText": "",
                        "link": "",
                        "title": "",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000879_room_01?scl=5&wid=1200&hei=850&align=.9,.6"
                        }
                    }
                },
                "presentation": {
                    "theme": "light"
                }
            },
            "filters": {
                "roomType": "room7",
                "floorType": "floorType3",
                "floorLook": "floorlook3",
                "floorColor": "floorColor1",
                "style": "style2"
            }
        },
        {
            "order": 7,
            "sku": "7",
            "color": "Product color 7",
            "name": "Product Name 7",
            "cta": {
                "content": {
                    "button": "primary",
                    "link": null,
                    "target": null,
                    "text": "Read More",
                    "url": "",
                    "alignment": null
                },
                "presentation": {
                    "buttonType": "primary"
                }
            },
            "image": {
                "content": {
                    "desktop": {
                        "altText": "",
                        "link": "",
                        "title": "",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/PT004-01_room_01?scl=6.1&wid=1200&hei=850&align=0,1"
                        }
                    },
                    "mobile": {
                        "altText": "",
                        "link": "",
                        "title": "",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/PT004-01_room_01?scl=6.1&wid=1200&hei=850&align=0,1"
                        }
                    }
                },
                "presentation": {
                    "theme": "light"
                }
            },
            "filters": {
                "roomType": "room2",
                "floorType": "floorType2",
                "floorLook": "floorLook2",
                "floorColor": "floorColor1",
                "style": "style1"
            }
        },
        {
            "order": 8,
            "sku": "8",
            "color": "Product Color 8",
            "name": "Product Name 8",
            "cta": {
                "content": {
                    "button": null,
                    "link": null,
                    "target": null,
                    "text": "Read More",
                    "url": "",
                    "alignment": null
                },
                "presentation": {
                    "buttonType": null
                }
            },
            "image": {
                "content": {
                    "desktop": {
                        "altText": "",
                        "link": "",
                        "title": "",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/PT001-440_room_01?scl=3.8&wid=1200&hei=850&align=0,0"
                        }
                    },
                    "mobile": {
                        "altText": "",
                        "link": "",
                        "title": "",
                        "original": {
                            "url": "https://s7d4.scene7.com/is/image/MohawkResidential/PT001-440_room_01?scl=3.8&wid=1200&hei=850&align=0,0"
                        }
                    }
                },
                "presentation": {
                    "theme": "light"
                }
            },
            "filters": {
                "roomType": "room6",
                "floorType": "floorType1",
                "floorLook": "floorlook3",
                "floorColor": "floorColor2",
                "style": "style1"
            }
        }
    ]
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImageGalleryComponent],
            providers: [BloomreachBaseClass],
            imports: [RouterTestingModule, MatDialogModule, NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageGalleryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should create the mapped Images from the data', () => {
        const imagesMapShouldbe = ImageGalleryMapper(mockData, null);
        const keysOfMappedData = Object.keys(imagesMapShouldbe);
        const keysOfMockedData = Object.keys(imagesMapped);
        expect(keysOfMappedData === keysOfMockedData).toBeTruthy();
    });
    it('should render the pagination button ', waitForAsync(() => {
        const fixture = TestBed.createComponent(ImageGalleryComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.gallery-pagination__button')).toBeTruthy();
    }));


    it('type of pagination should be array', () => {
        let type = typeof component.imagesPaginated;
        expect(type).toBe('object')
    });
    it('type of pagination should be number', () => {
        let type = typeof component.imagesQuantity;
        expect(type).toBe('number')
    });
    it('type of filtersTitle should be object', () => {
        let type = typeof component.filtersContent;
        expect(type).toBe('object')
    });

});


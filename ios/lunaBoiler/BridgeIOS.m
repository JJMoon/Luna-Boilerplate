//
//  BridgeIOS.m
//  lunaboilrplt
//
//  Created by Jongwoo Moon on 2017. 7. 31..
//  Copyright © 2017년 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import <React/RCTLog.h>

#import "BridgeIOS.h"

@interface BridgeIOS() {
  
  
  UIWebView *theWeb;
}

@end


////////////////////////////////////////////////////     _//////////_
@implementation BridgeIOS

-(instancetype)init {
  self = [super init];

  theWeb = [[UIWebView alloc]initWithFrame:CGRectMake(0, 0, 200, 300)];
  return self;
}

RCT_EXPORT_MODULE();

// 네이티브 웹뷰 세팅..
RCT_EXPORT_METHOD(initMessage) {
  RCTLogInfo(@"\n\n\n\n Obj c >> RCT_EXPORT_METHOD(initMessage) \n\n\n\n .");
  
  // NSString *url=@"http://www.google.com";
  
  //theWeb=[[UIWebView alloc]initWithFrame:CGRectMake(0, 0, 200, 300)];
  
//  NSURL *nsurl=[NSURL URLWithString:url];
//  NSURLRequest *nsrequest=[NSURLRequest requestWithURL:nsurl];
//  [theWeb loadRequest:nsrequest];
//  
//  
//  [[UIApplication sharedApplication].windows[0] addSubview:theWeb];
}


//  UIView *container = [[UIView alloc] init];
//  [container addSubview:theWeb];


//
//  theWeb.translatesAutoresizingMaskIntoConstraints = NO;
//
//  NSLayoutConstraint *leading = [NSLayoutConstraint
//                                 constraintWithItem:theWeb
//                                 attribute:NSLayoutAttributeLeading
//                                 relatedBy:NSLayoutRelationEqual
//                                 toItem:container
//                                 attribute:NSLayoutAttributeLeading
//                                 multiplier:1.0f
//                                 constant:0.f];
//
//  NSLayoutConstraint *trail = [NSLayoutConstraint
//                                 constraintWithItem:theWeb
//                                 attribute:NSLayoutAttributeTrailing
//                                 relatedBy:NSLayoutRelationEqual
//                                 toItem:container
//                                 attribute:NSLayoutAttributeTrailing
//                                 multiplier:1.0f
//                                 constant:0.f];
//
//  NSLayoutConstraint *top =[NSLayoutConstraint
//                               constraintWithItem:theWeb
//                               attribute:NSLayoutAttributeTop
//                               relatedBy:NSLayoutRelationEqual
//                               toItem:container
//                               attribute:NSLayoutAttributeTop
//                               multiplier:1.0f
//                               constant:0.f];
//
//
//  //Bottom
//  NSLayoutConstraint *bottom =[NSLayoutConstraint
//                               constraintWithItem:theWeb
//                               attribute:NSLayoutAttributeBottom
//                               relatedBy:NSLayoutRelationEqual
//                               toItem:container
//                               attribute:NSLayoutAttributeBottom
//                               multiplier:1.0f
//                               constant:0.f];
//
//
//
//
//  [container addConstraint:leading];
//  [container addConstraint:trail];
//  [container addConstraint:top];
//  [container addConstraint:bottom];



@end

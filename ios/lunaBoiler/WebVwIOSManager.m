//
//  BridgeIOS.m
//  lunaboilrplt
//
//  Created by Jongwoo Moon on 2017. 7. 31..
//  Copyright © 2017년 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

#import <React/RCTViewManager.h>
#import <React/RCTLog.h>

#import <MapKit/MapKit.h>

@interface WebVwIOSManager : RCTViewManager <UIWebViewDelegate>



//@property (nonatomic, assign) NSNumber *tNum;

@end

@interface WebVwIOSManager() {
  RCTResponseSenderBlock logoutCB;
}

@end

////////////////////////////////////////////////////     _//////////_
@implementation WebVwIOSManager

UIWebView *webVw;
int cnt = 0;

BOOL isTest;

RCT_EXPORT_MODULE();

// Logout Callback Setting
RCT_EXPORT_METHOD(setLogoutCallback:(RCTResponseSenderBlock)callback) {
  RCTLogInfo(@"\n\n\n\n Obj c >> ReactIosAuth :: setLogoutCallback \n\n\n\n .");
  
  logoutCB = callback;
}


// Login Info.
RCT_EXPORT_METHOD(loginInfo:(NSString *)jStr) {
  RCTLogInfo(@"\n\n\n\n Obj c >> ReactIosAuth :: loginInfo \n\n .");
  
  NSError *jsonError;
  NSData *objectData = [jStr dataUsingEncoding:NSUTF8StringEncoding];
  NSDictionary *jDic = [NSJSONSerialization JSONObjectWithData:objectData
                                                       options:NSJSONReadingMutableContainers
                                                         error:&jsonError];
  NSString *authType; //, *email, *passWord, *token;
  NSDictionary *tp = [jDic objectForKey:@"type"];
  if (tp) {
    authType = [jDic objectForKey:@"type"];
  } else {
    return;
  }
  NSLog(@"   login info : %@,   dic : %@     type : %@", jStr, jDic, authType);
  NSUserDefaults *defls = [NSUserDefaults standardUserDefaults];
  [defls setObject:jStr forKey:@"authInfo"];
}

- (UIView *)view {
  UIWebView *theWeb = [[UIWebView alloc] init];
  NSString *filePath=[[NSBundle mainBundle]pathForResource:@"indexx" ofType:@"html" inDirectory:@"embeded"];
  NSLog(@"\n\n IOS Webview index.html ::  %@  \n\n",filePath);
  NSString *htmlstring=[NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
  [theWeb loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:filePath]]];
  // or [theWeb loadHTMLString:htmlstring baseURL:nil];
  
  theWeb.delegate = self;
  
  NSString *inject22 =
  @"(function() { var originalPostMessage = window.postMessage; var patchedPostMessage = function(message, targetOrigin, transfer) { originalPostMessage(message, targetOrigin, transfer); }; patchedPostMessage.toString = function() { return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage'); }; window.postMessage = patchedPostMessage;})()";
  
  // NSString *inject = @"(function() { var originalPostMessage = window.postMessage; })()";
  
  // [theWeb stringByEvaluatingJavaScriptFromString:inject];
  
  NSString *jsCont = [[NSBundle mainBundle] pathForResource:inject22 ofType:@"js"];
  //NSString *js = [NSString stringWithContentsOfFile:jsPath encoding:NSUTF8StringEncoding error:NULL];  파일일 경우.
  [theWeb stringByEvaluatingJavaScriptFromString:jsCont];
  
  webVw = theWeb;
  
  return theWeb;
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request
 navigationType:(UIWebViewNavigationType)navigationType {
  NSString *msg = [[request URL] absoluteString];
  NSLog(@"   Message from web : %@", msg);
  
  cnt++;
  
  if ([[[request URL] absoluteString] hasPrefix:@"ios:logout"]) {
    [self logOut];
  }
  
  if ([[[request URL] absoluteString] hasPrefix:@"ios:"]) {
    // Call the given selector
    [self performSelector:@selector(webToNativeCall)];
    // Cancel the location change
    return NO;
  }
  return YES;
}

- (void)logOut {
  if (logoutCB == nil) {
    NSLog(@"\n\n\n logoutCB == nil \n\n\n");
  } else {
    logoutCB(@[[NSNull null], @" from obj c "]); // naverTokenSend(@[[NSNull null], token]);
    logoutCB = nil;
  }
}

- (void)webToNativeCall {
  NSString *theS = [NSString stringWithFormat:@" \" edited from objective - c >>> cnt :: %d \" ", cnt];
  NSString *js = [NSString stringWithFormat:@"document.getElementById(\"txtt\").innerHTML = %@", theS];
  [webVw stringByEvaluatingJavaScriptFromString:js];
  
}

- (void)webViewDidFinishLoad:(UIWebView *)webView {
  NSLog(@"\n\n\n\n\n Loading Finished Start \n");
  
  NSUserDefaults *defls = [NSUserDefaults standardUserDefaults];  // //  auth start ...
  NSString *jStr = [defls stringForKey:@"authInfo"];
  if (jStr != nil) {
    NSLog(@"\n\n\n    already got auth Info ::   %@ \n\n\n", jStr);
  }
  
  
  
  //dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 10 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
  //});
  
  
  
  
  
  
  
  //NSString *someVariable = [webView stringByEvaluatingJavaScriptFromString:@"window.main"];
  
  
  //NSString *js = @"document.getElementById('button').click = function() { window.location = 'my-protocol://dummmy.com/maybe/some/data';}";
  //[webView stringByEvaluatingJavaScriptFromString: js];
  
  //NSString *js = @"postMessage({ \"type\": \"EMAIL_LOGIN\", \"data\": { \"email\": \"hyochan.test@themoin.com\", \"password\": \"password12\" } });";
  //NSString *js = @"window.postMessage({ type: 'EMAIL_LOGIN', data: { email: 'hyochan.test@themoin.com', password: 'password12' } }, \"*\")";
  
  
  //NSString *source = @"window.originalPostMessage = window.postMessage; window.postMessage = function({ type: 'EMAIL_LOGIN', data: { email: 'hyochan.test@themoin.com', password: 'password12' } });";
  //[webView stringByEvaluatingJavaScriptFromString:source];
  
  
  // NSString *js = @"postMessage()";
  //NSString *js = @"document.getElementById(\"txtt\").innerHTML = \" how about this ? \" ";
  
  //[webView stringByEvaluatingJavaScriptFromString:js];
  
  //[webView stringByEvaluatingJavaScriptFromString:@"window.message(\"\")"];
  //[webView stringByEvaluatingJavaScriptFromString:@"document.postMessage(\"\")"];
  //[webView stringByEvaluatingJavaScriptFromString:@"window.postMessage(\"\")"];
  //[webView stringByEvaluatingJavaScriptFromString:@"postMessage(\"\")"];
  
  
  
  //[webView stringByEvaluatingJavaScriptFromString:@"document.getElementById(\"txtt\").innerHTML = \"Direct Change\";"];
  
  //  window.postMessage('{\"method\":\"play\"}'
  NSString *objJson = @"'{ \"type\": \"EMAIL_LOGIN\", \"data\": { \"email\": \"hyochan.test@themoin.com\", \"password\": \"password12\" } }'";
  
  NSString *js = [NSString stringWithFormat:@"document.postMessage(%@);", objJson];
  
  [webView stringByEvaluatingJavaScriptFromString:js];
  
  // document.getElementById("txtt").innerHTML = "Hello World";
  
  //NSLog(@"  check isTest %d", isTest);
  
  
  NSLog(@"\n\n\n\n   postMessage finished  ");
}


// javascript 부를 때 [self.webView stringByEvaluatingJavaScriptFromString:@"callJavascriptFromObjectiveC();"];

//    [NSHTTPCookieStorage sharedHTTPCookieStorage].cookieAcceptPolicy = NSHTTPCookieAcceptPolicyAlways;


RCT_EXPORT_VIEW_PROPERTY(isTest, BOOL);

RCT_EXPORT_VIEW_PROPERTY(loginInfo, NSString);

RCT_EXPORT_VIEW_PROPERTY(tNum, NSNumber);



@end

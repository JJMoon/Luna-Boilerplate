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

BOOL isTest, loginNotYet;

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
  
  NSString *objJson = @"{ \"type\": \"EMAIL_LOGIN\", \"data\": { \"email\": \"hyochan.test@themoin.com\", \"password\": \"password12\" } }";
  //NSString *capsuled = [NSString stringWithFormat:@"{ \"data\" : %@ }", objJson];
  [self performSelectorOnMainThread:@selector(login:) withObject:objJson waitUntilDone:NO];
  
  NSLog(@"   login info : %@,   dic : %@     type : %@", jStr, jDic, authType);
  NSUserDefaults *defls = [NSUserDefaults standardUserDefaults];
  [defls setObject:jStr forKey:@"authInfo"];
}

- (UIView *)view {
  //UIWebView *theWeb = [[UIWebView alloc] init];
  CGRect rect = CGRectMake(0, 200, 300, 500);
  UIWebView *theWeb = [[UIWebView alloc] initWithFrame:rect];
  
  
  NSString *filePath=[[NSBundle mainBundle]pathForResource:@"index" ofType:@"html" inDirectory:@"embeded"];
  NSLog(@"\n\n IOS Webview index.html ::  %@  \n\n",filePath);
  NSString *htmlstring=[NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
  [theWeb loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:filePath]]];
  // or [theWeb loadHTMLString:htmlstring baseURL:nil];
  
  theWeb.delegate = self;
  webVw = theWeb;
  loginNotYet = true;
  [NSHTTPCookieStorage sharedHTTPCookieStorage].cookieAcceptPolicy = NSHTTPCookieAcceptPolicyAlways;
  
  return theWeb;
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(nonnull NSError *)error {
  NSLog(@"  failed ..  ");
}

- (void)webView:(UIWebView *)webView didFailProvisionalNavigation:(null_unspecified WKNavigation *)navigation withError:(nonnull NSError *)error {
  NSLog(@"  provisional ");
}


// <script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
// <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>


- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request
 navigationType:(UIWebViewNavigationType)navigationType {
  
  if (navigationType == UIWebViewNavigationTypeLinkClicked) {
    NSLog(@"  UIWebViewNavigationTypeLinkClicked  ");
    //Allows for twitter links
    //[self.mainWebView loadRequest:request];
    return NO;
  }
  
  if ([request.URL.absoluteString isEqualToString:@"about:blank"]) {
    NSLog(@"  about : blank ");
    return YES;
  }
  
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

- (void)login:(NSString *)auth {
  NSString *loginStr = [NSString stringWithFormat:@"getAppMessage(%@);", auth];  // login getAppMessage
  // NSString *loginStr = @"showAlert();"; // java script test
  
  NSLog(@"\n\n\n Log In ::  %@   \n\n\n", loginStr);
  [webVw stringByEvaluatingJavaScriptFromString:loginStr];
}

- (void)logOut {
  loginNotYet = true;
  
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
//    NSString *loginStr = [NSString stringWithFormat:@"login(%@);", jStr];  // login
//    NSLog(@"  %@", loginStr);
//    [webVw stringByEvaluatingJavaScriptFromString:loginStr];
  }
  
  
  if (loginNotYet) {
    
    NSString *objJson = @"{ \"type\": \"EMAIL_LOGIN\", \"data\": { \"email\": \"hyochan.test@themoin.com\", \"password\": \"password12\" } }";
    //NSString *objJson = @"{\"type\":\"NAVER_LOGIN\",\"data\":{\"token\":\"AAAAOkmKc+bGeJhtc4+PvSsXLAuJnnVPaPU+UmmM2AYuc2GdpZ0B4mqCmGcPxnVn5UGxOkafFHlRjL4GEauNZSUg43Y=\"}}";
    
    //NSString *capsuled = [NSString stringWithFormat:@"{ \"data\" : %@ }", objJson];
    [self performSelectorOnMainThread:@selector(login:) withObject:objJson waitUntilDone:NO];
    loginNotYet = false;
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
  NSString *objJson = @"{ \"type\": \"EMAIL_LOGIN\", \"data\": { \"email\": \"hyochan.test@themoin.com\", \"password\": \"password12\" } }";
  NSString *capsuled = [NSString stringWithFormat:@"{ \"data\" : %@ }", objJson];
  
  //[self login:capsuled];
  
  
  NSLog(@"\n\n\n\n   postMessage finished  ");
}


// javascript 부를 때 [self.webView stringByEvaluatingJavaScriptFromString:@"callJavascriptFromObjectiveC();"];

//    [NSHTTPCookieStorage sharedHTTPCookieStorage].cookieAcceptPolicy = NSHTTPCookieAcceptPolicyAlways;


RCT_EXPORT_VIEW_PROPERTY(isTest, BOOL);

RCT_EXPORT_VIEW_PROPERTY(loginInfo, NSString);

RCT_EXPORT_VIEW_PROPERTY(tNum, NSNumber);



@end

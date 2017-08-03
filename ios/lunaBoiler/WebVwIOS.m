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

@interface WebVwIOS : RCTViewManager <UIWebViewDelegate>



@end

////////////////////////////////////////////////////     _//////////_
@implementation WebVwIOS

UIWebView *webVw;
int cnt = 0;

RCT_EXPORT_MODULE();

RCT_EXPORT_VIEW_PROPERTY(isTest, BOOL);


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
  
  if ([[[request URL] absoluteString] hasPrefix:@"ios:"]) {
    // Call the given selector
    [self performSelector:@selector(webToNativeCall)];
    // Cancel the location change
    return NO;
  }
  return YES;
}

//- (void)injectJavascript:(NSString *)resource {
//  NSString *jsPath = [[NSBundle mainBundle] pathForResource:resource ofType:@"js"];
//  NSString *js = [NSString stringWithContentsOfFile:jsPath encoding:NSUTF8StringEncoding error:NULL];
//  
//  [self.webView stringByEvaluatingJavaScriptFromString:js];
//}


- (void)webToNativeCall
{
  //NSString *returnvalue =  [self.webviewForHtml stringByEvaluatingJavaScriptFromString:@"getText()"];
  
  NSString *js = [NSString stringWithFormat:@"document.getElementById(\"txtt\").innerHTML = \" webToNativeCall : %d \" ", cnt];
  [webVw stringByEvaluatingJavaScriptFromString:js];
  
  //self.valueFromBrowser.text = [NSString stringWithFormat:@"From browser : %@", returnvalue ];
}

- (void)webViewDidFinishLoad:(UIWebView *)webView {
  NSLog(@" Loading Finished Start \n\n\n");
  
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
  
  
  NSLog(@"\n\n\n\n   postMessage finished  ");
}


// javascript 부를 때 [self.webView stringByEvaluatingJavaScriptFromString:@"callJavascriptFromObjectiveC();"];

//    [NSHTTPCookieStorage sharedHTTPCookieStorage].cookieAcceptPolicy = NSHTTPCookieAcceptPolicyAlways;




@end

#import "Toast.h"

#import <UIKit/UIKit.h>
#import <React/RCTConvert.h>

#import <UIKit/UIColor.h>
#import <UIKit/UIFont.h>

@implementation Toast

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(Show:(NSDictionary *)props){
    NSString *message = [props objectForKey: @"message"];
    NSString *duration = [props objectForKey: @"duration"];
    NSString *position = [props objectForKey: @"position"];
  
    CSToastStyle *style = [[CSToastStyle alloc] initWithDefaultStyle];
    style.maxWidthPercentage = 0.85;

    UIWindow *window = [[UIApplication sharedApplication] keyWindow];
  
    const NSNumber *durationInSecond = [self getDuration: duration];
    const NSString *toastPosition = [self getPosition: position];
    
    [CSToastManager setQueueEnabled: YES];

    [window
        makeToast: message
        duration: [durationInSecond intValue]
        position: toastPosition
        title: nil
        image: nil
        style: style
        completion:^(BOOL didTap) {
          [window clearToastQueue];
        }
    ];
}

- (const NSNumber *__strong) getDuration:(NSString *)duration {
  if([duration isEqualToString:@"LONG"]) {
    return [NSNumber numberWithInt:3.5];
  } else if([duration isEqualToString:@"DEFAULT"]){
    return [NSNumber numberWithInt:2];
  } else if([duration isEqualToString:@"SHORT"]) {
    return [NSNumber numberWithInt:1];
  } else {
    return [NSNumber numberWithInt:2];
  }
}

- (const NSString *__strong) getPosition: (NSString *)position {
    if([position isEqualToString:@"TOP"]) {
        return CSToastPositionTop;
    } else if([position isEqualToString:@"CENTER"]) {
        return CSToastPositionCenter;
    } else if([position isEqualToString:@"BOTTOM"]) {
        return CSToastPositionBottom;
    } else {
        return CSToastPositionCenter;
    }
}

@end

import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
    state,
    animateChild,
} from '@angular/animations';

export const fadeInAnimation = trigger('simpleFadeAnimation', [
    // the "in" style determines the "resting" state of the element when it is visible.
    state('in', style({ opacity: 1 })),

    transition('* => *', [
        query(':enter', [style({ opacity: 0 })], { optional: true }),

        query(
            ':leave',
            [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))],
            { optional: true }
        ),

        query(
            ':enter',
            [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))],
            { optional: true }
        ),
    ]),
]);

// export const slideInAnimation = trigger('routeAnimations', [
//     transition('options => *', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
//             optional: true,
//         }),
//         group([
//             query(
//                 ':enter',
//                 [
//                     style({ transform: 'translateX(-100%)' }),
//                     animate(
//                         '0.5s ease-in-out',
//                         style({ transform: 'translateX(0%)' })
//                     ),
//                 ],
//                 { optional: true }
//             ),
//             query(
//                 ':leave',
//                 [
//                     style({ transform: 'translateX(0%)' }),
//                     animate(
//                         '0.5s ease-in-out',
//                         style({ transform: 'translateX(100%)' })
//                     ),
//                 ],
//                 { optional: true }
//             ),
//         ]),
//     ]),
//     transition('shopping-list => *', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
//             optional: true,
//         }),
//         group([
//             query(
//                 ':enter',
//                 [
//                     style({ transform: 'translateX(100%)' }),
//                     animate(
//                         '0.5s ease-in-out',
//                         style({ transform: 'translateX(0%)' })
//                     ),
//                 ],
//                 { optional: true }
//             ),
//             query(
//                 ':leave',
//                 [
//                     style({ transform: 'translateX(0%)' }),
//                     animate(
//                         '0.5s ease-in-out',
//                         style({ transform: 'translateX(-100%)' })
//                     ),
//                 ],
//                 { optional: true }
//             ),
//         ]),
//     ]),
//     transition('main => options', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
//             optional: true,
//         }),
//         group([
//             query(
//                 ':enter',
//                 [
//                     style({ transform: 'translateX(100%)' }),
//                     animate(
//                         '0.5s ease-in-out',
//                         style({ transform: 'translateX(0%)' })
//                     ),
//                 ],
//                 { optional: true }
//             ),
//             query(
//                 ':leave',
//                 [
//                     style({ transform: 'translateX(0%)' }),
//                     animate(
//                         '0.5s ease-in-out',
//                         style({ transform: 'translateX(-100%)' })
//                     ),
//                 ],
//                 { optional: true }
//             ),
//         ]),
//     ]),
//     transition('main => shopping-list', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
//             optional: true,
//         }),
//         group([
//             query(
//                 ':enter',
//                 [
//                     style({ transform: 'translateX(-100%)' }),
//                     animate(
//                         '0.5s ease-in-out',
//                         style({ transform: 'translateX(0%)' })
//                     ),
//                 ],
//                 { optional: true }
//             ),
//             query(
//                 ':leave',
//                 [
//                     style({ transform: 'translateX(0%)' }),
//                     animate(
//                         '0.5s ease-in-out',
//                         style({ transform: 'translateX(100%)' })
//                     ),
//                 ],
//                 { optional: true }
//             ),
//         ]),
//     ]),
// ]);

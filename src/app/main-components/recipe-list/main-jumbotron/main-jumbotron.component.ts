import {
    Component,
    OnInit,
    TemplateRef,
    Input,
    ViewChild,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ListKeyManager, ListKeyManagerOption } from '@angular/cdk/a11y';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-main-jumbotron',
    templateUrl: './main-jumbotron.component.html',
    styleUrls: ['./main-jumbotron.component.scss'],
})
export class MainJumbotronComponent implements ListKeyManagerOption, OnInit {
    @Input() public image: SafeStyle;
    @Input() public overlayColor = '#00000040';
    @Input() public hideOverlay = false;
    @Input() public disabled = false; // implements ListKeyManagerOption

    @ViewChild(TemplateRef) public templateRef: TemplateRef<any>;

    constructor(public sanitizer: DomSanitizer) {}

    public ngOnInit(): void {
        if (this.image) {
            this.image = this.sanitizer.bypassSecurityTrustStyle(
                `url("${this.image}")`
            );
        }
    }
}

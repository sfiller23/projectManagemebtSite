import { Directive, HostBinding, ElementRef, AfterViewInit, OnInit, HostListener, AfterContentInit, Renderer2 } from '@angular/core';
import { FormService } from '../services/form.service';

@Directive({
  selector: '[appAutoCheckBoxSet]'
})
export class AutoCheckBoxSetDirective implements OnInit, AfterContentInit {

  @HostBinding('attr.checked') isChecked: boolean = true;

  constructor(private el: ElementRef, private formService: FormService, private renderer: Renderer2) { }

  // ngAfterViewInit(){


  // }

  @HostListener('hover') test(){
    console.log("hover");
    this.isChecked = false;
  }


  ngAfterContentInit(){


  }


  ngOnInit(){
    // const currentElement = this.el.nativeElement;
    // this.renderer.setAttribute(currentElement, 'checked', 'false');
    // console.log(this.isChecked.valueOf());

    // console.log("directive trigered")
    // this.isChecked = true;
    // const formExists = this.formService.currentItem;
    // const currentId = this.el.nativeElement.id;
    // const membersArray = formExists.members;
    // console.log(membersArray);
  }



}

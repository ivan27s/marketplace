import {ElementRef, Injectable} from '@angular/core';

declare var M;

export interface MaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export interface MaterialDatepicker extends MaterialInstance{
  date?: Date;
}
@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  toast(message: string): void {
    M.toast({html: message});
  }

  updateTextInputs(): void {
    M.updateTextFields();
  }
  initializeSelect(ref: ElementRef): MaterialInstance  {
    return M.FormSelect.init(ref.nativeElement);
  }
  initializeSidenav(ref: ElementRef): MaterialInstance  {
    return M.Sidenav.init(ref.nativeElement);
  }
  initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement);
  }
}

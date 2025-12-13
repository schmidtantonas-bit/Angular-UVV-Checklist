import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss'
})
export class TextareaComponent {
  @Input() placeholder = '';
  @Input() label = '';
  @Input() disabled = false;
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
}

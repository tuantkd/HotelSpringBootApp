import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DemoFlexyModule } from 'src/app/demo-flexy.module';

@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [DemoFlexyModule, FormsModule, MatCardModule, MatTableModule],
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent {
  color = 'accent';
  checked = false;
  disabled = false;
}

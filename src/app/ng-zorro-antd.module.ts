
import { NgModule } from '@angular/core';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  exports: [
    NzMessageModule,
    NzModalModule,
    NzTableModule
  ]
})
export class DemoNgZorroAntdModule {}

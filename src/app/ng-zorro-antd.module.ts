
import { NgModule } from '@angular/core';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  exports: [
    NzMessageModule,
    NzModalModule,
  ]
})
export class DemoNgZorroAntdModule {}

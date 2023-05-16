import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(information: any[], filterText: string): any[] {
    console.log(filterText);
    console.log(information);
    if ( filterText == ''){
      console.log(' l1 ');
      return information
    }

    filterText = filterText.toLowerCase();

    return information.filter( item => {
      console.log(item);
      console.log(item.Name.toLowerCase());

      return item.Name.toLowerCase().includes( filterText )
    })
  }

}

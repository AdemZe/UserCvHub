import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperAndFusionPipe implements PipeTransform {

  transform(  value: { data :string[] } , metadata: ArgumentMetadata  ) {

    const newtab=value.data.map(  (elemnt)=> elemnt.toUpperCase()   );
    
    console.log( value.data)
    
    return newtab
     
  
  }

  
}

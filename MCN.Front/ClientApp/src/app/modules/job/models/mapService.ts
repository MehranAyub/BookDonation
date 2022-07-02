export interface Marker{
    position?:Position;
    title?:string;
    options?:Option;
    icon?:any;
    info?:string;
    label?:Label;
    data?:SearchResultDto;
}

export interface Position{
    lat:number;
    lng:number;
}

export interface Option{
animation:any;
icon:any;
draggable:boolean;
}
export interface Label{
    color:any;
    text:any;
}

export interface SearchFilter{
     Keyword:string 
     MinDistance:number 
     MaxDistance:number 
     Interests:number[] 
     SearchLat:number 
     SearchLng:number 
     isDistance:boolean
}


export interface SearchResultDto
{
      id :number
      email :string
      firstName:string 
      lastName :string
      gender :string
      title :string
      distance :number
      latitude:number
      longitude:number
}

export interface InterestFilter
{ 
     Keyword: string
     PageNumber: number
     PageSize: number
}

export interface InterestDto
{
     id:number
     title:string
     paid:boolean
     description:string
     cost:number
     type:string
     display:string
     value:string

}

// public class SearchFilter
// { 
//     public string Keyword { get; set; }
//     public double MinDistance { get; set; }
//     public double MaxDistance { get; set; }
//     public List<int> Interests { get; set; }
//     public double SearchLat { get; set; }
//     public double SearchLng { get; set; }

// }
// this.markers.push({
//     position: {
//       lat: item.lat,
//       lng: item.long,
//     },
//     title: item.firstName+item.lastName,
//     options: {
//       animation: null,
//       icon: {
//         url: 'assets/Images/icons/PickPin.svg',
//       },
//     },
//   });
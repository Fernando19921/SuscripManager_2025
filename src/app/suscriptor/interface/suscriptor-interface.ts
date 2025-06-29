export interface suscriptor{
    id:number,
    nombre:string,
    paquete:string,
    promocion:string,
    suscriptor_id:number,
    vigente:string
}

export interface reporteSuscriptor{
  nombre:string,
  correo:string,
  colonia:string,
  nombre_paquete:string,
  servicios:string[],
  descripcion:string,
  vigente:string,
  precio:number,
  conDescuento:number
}

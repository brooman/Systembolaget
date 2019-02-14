module.exports = {
  builder: (item) => {

    const data = {
      ProductNumber: item.nr,
      ProductNumberShort: item.Varnummer,
      ProductId: item.Artikelid,

      //Name
      Name: item.Namn ? item.Namn : null,
      NameExtention: item.Namn2 ? item.Namn2 : null,

      //Price
      Price: item.Prisinklmoms ? item.Prisinklmoms : null,
      PriceCompare: item.PrisPerLiter ? item.risPerLiter : null,
      //APK: Number,

      //Content
      Volume: item.Volymiml ? item.Volymiml : null,
      Alcohol: item.Alkoholhalt ? item.Alkoholhalt : null,

      //Assortment
      Assortment: item.Sortiment ? item.Sortiment : null,
      AssortmentText: item.SortimentText ? item.SortimentText : null,
      Type: item.Typ ? item.Typ : null,
      Style: item.Stil ? item.Stil : null,

      //Make
      Producer: item.Producent ? item.Producent : null,
      Supplier: item.Leverantor ? item.Leverantor : null,
      Area: item.Ursprung ? item.Ursprung : null,
      Country: item.Ursprunglandnamn ? item.Ursprunglandnamn : null,
      Packaging: item.Forpackning ? item.Forpackning : null,
      Year: item.Argang ? item.Argang : null,

      //Filters
      Organic: item.Ekologisk ? item.Ekologisk : false,
      Ethical: item.Etiskt ? item.Etiskt : false,
      Koscher: item.Koscher ? item.Koscher : false,
      Expired: item.Utgått ? item.Utgått : false,
      SaleStart: item.Saljstart ? item.Saljstart : false
    }

    return data;
  }
}
var settings = 

{
 'userName'    : 'Pho King',
 'sortMethod'  : 'distance',
 'zipCode'     : '54311',
 'zipCodeList' : 
  [
     '54311', //green bay
     '54911', //appleton
     '54901', //oshkosh
     '54235', //sturgeon bay
     '53081'  //sheboygan
  ],
 'productCodes' :
  [
     '34253677',     //basics
     '32803180',     //mystery
     '499041464',    //premium
     '365127812',    //favorites
     '655207018',    //team transport
     '087-07-0027',  //basics
     '087-07-5703',  //favorites
     '087-07-0704'   //haulers
  ]
}



/*

NOTES: ALL REQUIRED SETTINGS
=================
userName : please use a unique name

sortMethod : your default choice
  - possible choices:
    • distance
    • quantity

zipCode : your default choice

zipCodeList : your selectable list
  - must place each zip code in single
    quotes
  - must separate each with a comma

productCodes : your product list
  - must use hyphens for Target DPCI
  - must use place sku/dpci in single
    quotes
  - must separate each with a comma


Text following // are comments. They are not required but will help you keep track of what each sku/dpci is.
 
*/

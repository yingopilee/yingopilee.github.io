    var settings =
    {
      'userName': '',
      'sortMethod': 'distance',
      'zipCode': '54311',
      'zipCodeList':
        [
          '54311|Green Bay',
          '54911|Appleton',
          '54901|Oshkosh',
        ],
      'productCodes':
        [
          '34253677     | Basics',
          '32803180     | Mystery',
          '499041464    | Premium',
          '365127812    | Favorites',
          '655207018    | Team Transport',
          '49467534     | Replica Ent',
          '805984709    | Car Culture',
          '087-07-0027  | Basics',
          '087-07-5703  | Favorites',
          '087-07-4916  | Team Transports',
          '087-07-2218  | Replica Ent'
        ],
      'overrrideProductName': true,
      'showDateTime': true,
      'hand': 'right'
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

    overrideProductName : used for custom descriptions
     - possible choices:
        • true
        • false
    
    showDateTime : used to show or hide date/time stamp (default is true)
      - possible choices:
        • true
        • false

    hand : used to position the search and next button (default is left)
      - possible choices:
        • left
        • right

    Text following // are comments. They are not required but will help you keep track of what each sku/dpci is.

*/

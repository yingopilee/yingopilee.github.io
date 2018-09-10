var skus = ['34253677','32803180']
var accessCode = '';
var zipCode = '54311';
var ProductList = [];
const apiUrlWal = "https://brickseek.com/walmart-inventory-checker";

var countObj = {
	set increment(amount) {
		this.counter += amount;
		if (this.counter == skus.length){
			//displayResults();
		}
	},
	set incrementZip(amount) {
		this.zipCounter += amount;
	},
	counter: 0,
	zipCounter: 0
}

function search(item, zipCode, storeCode) {
	var xhttp = new XMLHttpRequest();

	//if (storeCode == 'WAL') {
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {

				var doc = this.response;
				var addresses = Array.from(doc.getElementsByTagName('address'));
				var quantities = Array.from(doc.getElementsByClassName('bsapi-table__cell-quantity'));
				var product;
				var isNew = false;
				product = (ProductList.filter(p => p.SKU == item)[0]);

				if (typeof (product) == 'undefined') {
					product = new Product();
					product.Name = doc.getElementsByClassName("bsapi-product-overview__title")[0].innerText;
					product.SKU = item;
					isNew = true;
				}

				for (var i = 0; i < addresses.length; i++) {
					var add = addresses[i].innerText.split('\n');
					var addr = add[0] + " " + add[1];
					var store = new Store(addr, quantities[i].innerText.replace("Quantity: ", ""));
					product.StoreList.push(store);
					product.StoreCode = storeCode;
				}

				if (isNew) {
					ProductList.push(product);
					countObj.increment = 1;
				}
				else {
					for (var i = 0; i < ProductList.length; i++) {
						if (ProductList[i].SKU == item) {
							ProductList[i] = product;
							break;
						}
					}
				}
			}
			if (this.readyState == 4 && this.status == 403) {
				displayMessage('<span style="color: red; font-weight: bold;">CAPTCHA REQUIRED: </span> Go to <a href="http://www.brickseek.com">Brickseek</a> and complete the CAPTCHA')
			}

			console.log(ProductList)
		};

		xhttp.open("POST", apiUrlWal, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.responseType = "document";
		try {
			xhttp.send("search_method=sku&sku=" + item + "&upc=&zip=" + zipCode + "&sort=distance");
		}
		catch (err) {
			console.log(err);
		}
	//}
	// else {
	// }

	return 1;
}

function displayResults() {
	console.log('displaying results')
	var final = '<head><title>Inventory Seeker Pro Results</title></head><style>caption,footer{background-color:#4CAF50;color:#fff;padding:12px}.store,div{width:500px}table{font-family:"Trebuchet MS",Arial,Helvetica,sans-serif;border-collapse:collapse;width:100%}td,th{border:1px solid #ddd;padding:8px}tr:nth-child(even){background-color:#f2f2f2}tr:hover{background-color:#ddd}caption{text-align:left;}.quantity{text-align:right}footer{clear:both;text-align:center}div{float:left;margin:15px}tr{text-align:left;vertical-align:top}</style>';

	var tableData = '';
	var newData = false;
	ProductList.forEach(function (product) {
		var htmlOutput = '';
		//if (product.StoreCode == 'WAL') {
			htmlOutput = '<div><table class="product"><tr><td style="background-color: #4CAF50;" colspan="2" width="500">{0}</td></tr>{1}</table></div>';
		//}
		var data = '';
		//console.log("");
		//console.log(product.Name);

		//console.log("******************************************************************");
		product.StoreList.forEach(function (store) {
			data += '<tr><td class="store">{0}</td><td class="quantity">{1}</td></tr>'.format(store.Address, store.Quantity);
			//	console.log(store.Address.padEnd(50, " "), store.Quantity);
		})

		tableData += htmlOutput.format(product.Name, data);

		newData = true;
	})
	var url = '';

	if (!newData) {
		//final += '<p>Error: You have run into a CAPTCHA! Please visit <a href="http://www.brickseek.com">BrickSeek</a> to clear the CAPTCHA.</p>';
		url = "http://www.brickseek.com";
	}
	else {
		url = "data:text/html," + encodeURIComponent(final + tableData + '<footer>Inventory Seeker Pro</footer>');
	}

	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var activeTab = tabs[0];
		var activeTabId = activeTab.id;
		chrome.tabs.update(activeTabId, { url: url });

		if (url != "http://www.brickseek.com" && autoExport) {
			// write data to excel sheet
			var a = document.createElement('a');
			var data_type = 'data:application/vnd.ms-excel';
			a.href = data_type + ', ' + encodeURIComponent(final + tableData);

			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1; //January is 0!
			var yyyy = today.getFullYear();

			if (dd < 10) {
				dd = '0' + dd;
			}

			if (mm < 10) {
				mm = '0' + mm;
			}

			today = mm + '-' + dd + '-' + yyyy + '_' + today.toLocaleTimeString();

			a.download = today + '.xls';
			a.click();
		}
		//window.open('data:application/vnd.ms-excel,' + encodeURIComponent(final+tableData));
	});
}

function run(){
    if (zipCode != '') {
        //if (zipCodeList.length > 0) {
            //zipCodeList.forEach(function (zip) {
                if (skus.length > 0) {
                    if (Number(zipCode.trim())) {
                    // if (Number(zip.trim())) {
                        skus.forEach(function (sku) { var inc = search(sku, zipCode.trim()); });
                        // skus.forEach(function (sku) { var inc = search(sku.SKU.toString().trim(), zip.trim(), sku.StoreCode); countObj.incrementZip = inc; });
                    }
                    else {
                        displayMessage('ERROR: Not a valid zip code');
                    }
                }
                else {
                    displayMessage('ERROR: Please add at least one product.');
                }

                //countObj.incrementZip = 1;
            //})

            //setTimeout(displayResults, 5000);
        //}
    }
    else {
        if (zipCode == '') {
            displayMessage('ERROR: Zip code not supplied.');
        }
        else {
            displayMessage('ERROR: Invalid access code');
        }
    }
}

function displayMessage(msg) {
	console.log(msg)
}

riot.tag2('tickerselect', '<span>{count}</span> <select id="allselect"> <option each="{allitems}" name="{id}"> {name} </option> </select> <ul id="mytic"> <li each="{items}"> <span>{name}</span> </li> </ul>', '', '', function(opts) {
    this.allitems = []
    this.items = []
    self = this
    this.count = '( Loading... )'

    fetch( 'https://api.coinmarketcap.com/v1/ticker/?limit=0' )
    .then( data => data.json() )
    .then( json => {
        self.count = json.length
        self.allitems = json
        self.update()
        var allselect = $('#allselect').select2();
        allselect.on('select2:select', function(e){
            console.log("select2:select", e);
            e_id = e.params.data.element.attributes.name.textContent
            self.items.push({
                "id": e_id,
                "name": e.params.data.id,
                "data": self.allitems.filter(function(ele, i , arr){ return (e_id == ele.id) } )
            });
            self.update()
        });
        return json
    });

    this.selected = function(e) {

    }.bind(this)
});
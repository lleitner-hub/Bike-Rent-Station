//add a new bike
const form = document.querySelector('#newBikeForm');
form.addEventListener('submit', (e) =>{
  e.preventDefault();
  db.collection('bicycle').add({
    Name: form.name.value,
    Size: form.size.value,
    Available: form.available.checked,
    Damaged: form.damaged.checked
  });
  form.name.value = '';
  form.size.value = '';
  form.available.checked = true;
  form.damaged.checked = false;
  reloadList();
});

//get bikes with filter
const filterForm = document.querySelector('#filterForm');
filterForm.addEventListener('submit', (e) =>{
  e.preventDefault();

  let option = document.getElementById('filterSelect').value;
  let filter = null;
  if(option == 'Name'){
    filterInput = filterForm.name.value;
  }else if(option == 'Size'){
    filterInput = filterForm.size.value;
  }else if(option == 'Available'){
    filterInput = filterForm.available.checked;
  }else if(option == 'Damaged'){
    filterInput = filterForm.damaged.checked;
  }
  bikelist.filterGet(option,filterInput);

});

function reloadList(sort = null){
  document.getElementById('bikeListContent').innerHTML ="";
  bikelist.init(sort);
}


//alert toggles
jQuery(document).ready(function(){
  jQuery("#btn-alert-success").click(function(){
    jQuery("#alert-success").fadeToggle("slow");
  });
  jQuery("#btn-alert-warning").click(function(){
    jQuery("#alert-warning").fadeToggle("slow");
  });  
  jQuery("#btn-alert-error").click(function(){
    jQuery("#alert-error").fadeToggle("slow");
  });

});

//filter options toggle  
jQuery(document).ready(function(){
  jQuery('#filterSelect').change(function(){
    jQuery("#filterName").fadeOut("fast");
    jQuery("#filterSize").fadeOut("fast");
    jQuery("#filterAvailable").fadeOut("fast");
    jQuery("#filterDamaged").fadeOut("fast");

    let option = document.getElementById('filterSelect').value;
    if(option == 'Name'){
      jQuery("#filterName").fadeToggle("slow");
    }else if(option == 'Size'){
      jQuery("#filterSize").fadeToggle("slow");
    }else if(option == 'Available'){
      jQuery("#filterAvailable").fadeToggle("slow");
    }else if(option == 'Damaged'){
      jQuery("#filterDamaged").fadeToggle("slow");
    }
  });
});

jQuery(document).ready(function(){
  jQuery("#addBike").click(function(){
    jQuery("#newBikeContainer").fadeToggle("slow");
  });
});

jQuery(document).ready(function(){
  jQuery("#filterBtn").click(function(){
    jQuery("#filterContainer").fadeToggle("slow");
  });
});

jQuery(document).ready(function(){
  jQuery("#resetFilterBtn").click(function(){
    reloadList();
  });
});



let bikelist = new Vue({
  el: '#showBikeList',
  data: {
      bikes: [],
      bikesId: []
  },
  methods:{
    filterGet(option, filterInput){
      document.getElementById('bikeListContent').innerHTML ="";
      db.collection('bicycle').where(option, '==', filterInput).get().then((bikes) => {
        bikes.docs.forEach(bike => {
          this.bikesId.push(bike.id);
            this.bikes.push(bike.data());
          });
      });  
    },
    init(sort = null){
      if(sort == null){
        sort = 'Available';
      }
      db.collection('bicycle').orderBy(sort, 'desc').get().then((bikes) => {
        bikes.docs.forEach(bike => {
          this.bikesId.push(bike.id);
            this.bikes.push(bike.data());
          });
      });    
    },
    sortName(){
      document.getElementById('bikeListContent').innerHTML ="";
      this.init('Name')
    },
    sortAvailable(){
      document.getElementById('bikeListContent').innerHTML ="";
      this.init('Available')
    },
    sortSize(){
      document.getElementById('bikeListContent').innerHTML ="";
      this.init('Size')
    },
    sortDamaged(){
      document.getElementById('bikeListContent').innerHTML ="";
      this.init('Damaged')
    },

    deleteBike(id){
      db.collection('bicycle').doc(id).delete().then(resp =>{
        reloadList();
      });
    },
    rentBike(id){
     
      db.collection('bicycle').doc(id).get().then((bike) => {
        let available = null;
        available = bike.data()['Available'];

        if(available === true){
          db.collection('bicycle').doc(id).update({
            Available: false
          }).then( res =>{
            jQuery("#alert-success").fadeToggle("slow");
            reloadList();
          });
        }
        else if(available === false){
          jQuery("#alert-warning").fadeToggle("slow");
        }
        else{
          jQuery("#alert-error").fadeToggle("slow");
        }

      });        
    },
    returnBike(id){
      db.collection('bicycle').doc(id).update({
        Available: true
      }).then( res =>{
        jQuery("#alert-success").fadeToggle("slow");
        reloadList();
      });
    }
  },
  mounted: function(){
      this.init();
  },
  created(){
    let loadingCircle = document.getElementById('loadingCircle');
    loadingCircle.hidden = true;
  }
});




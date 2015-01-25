(function(){
  var setHeight = function(){
    $('.fill-viewport').height($(window).height());
  };

  $(document).ready(function(){
    setHeight();
  });

  $(window).resize(function() {
    setHeight();
  });



  //particles

	var container;
	var camera, scene, renderer, group, particle;
	var mouseX = 0, mouseY = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	var colors = [
		0xFF6434,
		0xD63C1D,
		0x008173,
		0x00CFBE,
		0xE6E6E6
	];


	init();
	animate();

	function init() {

		// container = document.createElement( 'div' );
		// document.body.appendChild( container );

		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
		camera.position.z = 1000;

		scene = new THREE.Scene();

		var PI2 = Math.PI * 2;
		var program = function ( context ) {

			context.beginPath();
			context.arc( 0, 0, 0.4, 0, PI2, true );
			context.fill();

		};

		group = new THREE.Group();
		scene.add( group );

		for ( var i = 0; i < 1000; i++ ) {

			var material = new THREE.SpriteCanvasMaterial( {
				//color: Math.random() * 0x808008 + 0x808080,
				color: new THREE.Color(colors[Math.floor(Math.random()*colors.length)]),
				program: program
			} );

			particle = new THREE.Sprite( material );
			particle.position.x = Math.random() * 2300 - 1000;
			particle.position.y = Math.random() * 2400 - 1000;
			particle.position.z = Math.random() * 2500 - 1000;
			particle.scale.x = particle.scale.y = Math.random() + 7;
			group.add( particle );
		}

		renderer = new THREE.CanvasRenderer({alpha: true});
		renderer.setClearColor( 0x222222, 1);
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );

    $('body').prepend(renderer.domElement);
    // container.appendChild( renderer.domElement );

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		// document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		// document.addEventListener( 'touchmove', onDocumentTouchMove, false );

		window.addEventListener( 'resize', onWindowResize, false );

	}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	//

	function onDocumentMouseMove( event ) {

		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}

	// function onDocumentTouchStart( event ) {
  //
	// 	if ( event.touches.length === 1 ) {
  //
	// 		event.preventDefault();
  //
	// 		mouseX = event.touches[ 0 ].pageX - windowHalfX;
	// 		mouseY = event.touches[ 0 ].pageY - windowHalfY;
  //
	// 	}
  //
	// }
  //
	// function onDocumentTouchMove( event ) {
  //
	// 	if ( event.touches.length === 1 ) {
  //
	// 		event.preventDefault();
  //
	// 		mouseX = event.touches[ 0 ].pageX - windowHalfX;
	// 		mouseY = event.touches[ 0 ].pageY - windowHalfY;
  //
	// 	}
  //
	// }

	//

	function animate() {

		requestAnimationFrame( animate );

		render();

	}

	function render() {

		camera.position.x += ( mouseX - camera.position.x ) * 0.01;
		camera.position.y += ( - mouseY - camera.position.y ) * 0.01;
		camera.lookAt( scene.position );

		group.rotation.x += 0.001;
		group.rotation.y += 0.002;

		renderer.render( scene, camera );

	}

})();

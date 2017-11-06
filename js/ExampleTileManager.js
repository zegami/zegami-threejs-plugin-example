/**
 * @license ExampleTileManager for Zegami Ltd Copyright (c) 2017, Coritsu Group All Rights Reserved.
 */

/**
 * Module to use the TileManager as a plugin using Zegami's plugins architecture
 *
 * @param {Object} Ajax     Plugin dependency
 * @param {Object} Config   Plugin dependency
 * @param {Object} Events   Plugin dependency
 * @param {Object} Helpers  Plugin dependency
 */
function ExampleTileManagerPlugin(Ajax, Config, Events, Helpers) {
    'use strict';

    this.constructor = function (viewManager, options, name) {

        // Call the superclass constructor (SimpleTileManager) for basic features
        this.base.constructor.apply(this, arguments);

        // Define and initialize properties
        this.type = 'Example';                // Set tile manager type name
        this.dataDriven = true;               // Flag to indicate behaviour in internal features.

        //Predefine the geometry and materials.
        this.geometry = new THREE.ParametricGeometry(this.klein, 25, 25);
        this.material = new THREE.MeshPhongMaterial({color: 0x0055ff});

        //We key in datastore indexes to know which objects we've constructed.
        this.objectMap = {};

        //Set this information so we know what size your tiles are.
        this.picInfo = {
            width: 128,
            height: 128
        }

        //Flag helps tell the baseview and simpletilemanager to ignore picture sources.
        this.imageless = true;
    }
    /**
     * Function for parametric geometries. Example of threejs capabilities.
     * We use this function to construct the funny shape.
     * https://threejs.org/examples/js/ParametricGeometries.js
     */
    this.klein =  function (u, v) {
            u *= Math.PI;
            v *= 2 * Math.PI;
            u = u * 2;
            var x, y, z;
            if (u < Math.PI) {
                x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
                z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
            } else {
                x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
                z = -8 * Math.sin(u);
            }
            y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

            //Reduce for 1:1.
            x/=14;
            y/=14;
            z/=14;

            return new THREE.Vector3(x, y, z);
    };
    /**
     * Basic information for the baseview.
     * You need this to define the size of the view area.
     */
    this.getDynamicPictureInfo = function () {
        return { fileSize: 0, width: this.picInfo.width, height: this.picInfo.height, id: 0, source: '' };
    }
    /**
     * Initializes the drawing of textures based on the view.
     * @method setTexture
     * @param   {Object}    planes  The planes which we are setting (in view).
     * @param   {Object}    zoom    The current zoom of the view.
     * @param   {Object}    offset  The offsets of the view.
     * @param   {Object}    data    The data objects of the planes sent.
     */
    this.setTexture = function (planes, zoom, offset, data) {

        //Add our main group to the scene if it doesn't already exist.
        if (typeof this.viewManager.groups.example === 'undefined') {
            this.viewManager.groups.example = new THREE.Group();
            this.viewManager.scene.add(this.viewManager.groups.example);
        }        

        //Loop through our planes.
        for (var i=0; i<planes.length; i++) {
            if (typeof this.objectMap[planes[i].datastoreIndex] === 'undefined') {
                //Create a new THREEJS mesh with the geometry and material already defined on init.
                var object = new THREE.Mesh(this.geometry,this.material);

                //Random rotation for some variation.
                object.rotation.set(Math.random()*Math.PI*2,0,0);

                //Link the new object to the plane objects.
                planes[i].mesh = object;
                object.userData.plane = planes[i];

                //Add it to the group (to the scene) so we can see it.
                this.viewManager.groups.example.add(object);

                this.objectMap[planes[i].datastoreIndex] = object;

                //This triggers an update to our plane objects, they control position & scale.
                planes[i].update(true);
            }
        }
    }
}

/**
 * The variable simplify the call to load the plugin itself using Zegami's plugin architecture.
 *
 * @type {Array}
 */
/*eslint no-unused-vars: 0*/
var ExampleTileManager = ['Ajax', 'Config', 'Events', 'Helpers', ExampleTileManagerPlugin];

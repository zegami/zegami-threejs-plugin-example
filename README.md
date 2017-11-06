# Tile Manager Example with three.js

This is an example of how to implement a basic tile manager using the Zegami plugin architecture. The plugin constructs a THREE.js mesh for each item and demonstrates the flow for doing so.

It does not cover how to effectively load resources as part of the zegami initialization flow and use those for processing. It also does not cover how to work with the data associated with each sprite. It is expected that you have some experience using graphics libraries such as OpenGL if you plan to draw complex objects at scale.

## Installation

This is a zegami plugin, you will need Zegami client 1.5.1 to use this. Then do the following:

* Copy ExampleTileManager.js to /js/plugins/tilemanagers/
* Declare the tile manager in your page as a script block.
* Call .tileManager('Example','ExampleTileManager') on your zegami object before you attach it.
* Define the example tile manager as type 'Example' in your zegami configuration JSON.
* Declare the tile manager 'Example' for each view's options in your zegami confgiuration JSON.
* Run your zegami client.

## Tips

Define complex geometries and texture resources in the constructor to prevent hanging.
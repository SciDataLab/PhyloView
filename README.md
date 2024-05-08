# PhyloView documentation

## 1 Introduction

### 1.1 About PhyloView

[PhyloView](http://www.phyloview.cc) is a [d3.js](https://d3js.org) based tool for visualizing Phylogenetic trees. PhyloView supports tree files in Newick and Nexus formats and exports images in SVG, PNG formats. PhyloView also supports selecting branches, editing or deleting subtrees, converting tree structures, changing fonts, displaying metadata, etc.

### 1.2 Quick Use

#### 1.2.1  CDN

The lastest version of PhyloView now supports CommonJS and introducing with the basic label. We recommend linking to a specific version to prevent unexpected disruption. It is advisable to download PhyloView for local implementation.

```html
<!-- import PhyloView online -->
<script src="http://www.darwintree.cn/PhyloView/phyloview.main.js"></script>
<script src="http://www.darwintree.cn/PhyloView/phyloviewGL.main.js"></script>
```

Examples

Use CND for quick example of tree view:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>phyloview</title>
</head>

<body>
    <div id="dendrogram"></div>
    <script src="http://www.phyloview.cc/cdn/phyloview.main.js"></script>
    <script>
        new phyloview.InitTreeStructure("#dendrogram", { content: "" })
        // or
        phyloview.InitTreeLayoutStructure("#dendrogram", {
            content: "",
            layout: "tree"
        })
    </script>
</body>

</html>
```

Use CND for quick example of radial view:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>phyloview</title>
</head>

<body>
    <div id="dendrogram"></div>
    <script src="http://www.phyloview.cc/cdn/phyloview.main.js"></script>
    <script>
        new phyloview.InitRadialStructure("#dendrogram", { content: "" })
        // or
        phyloview.InitTreeLayoutStructure("#dendrogram", {
            content: ""
            layout: "radial"
        })
    </script>
</body>

</html>
```

#### 1.2.2  NPM

use npm

```
$ npm install phyloview --save
```

or  global reference

```html
<script type="text/javascript" src="phyloview.main.js"></script>
<script type="text/javascript" src="phyloviewGL.main.js"></script>
```

example

```javascript
import phyloview from "phyloview";

new phyloview.InitTreeStructure("#dendrogram", { content: "" })

// or
new phyloview.InitRadialStructure("#dendrogram", { content: "" })

// or
phyloview.InitTreeLayoutStructure("#dendrogram", {
    content: ""
    layout: "" // radial、tree
})
```

NPM quote by request
```javascript
import { InitTreeStructure, InitRadialStructure, InitTreeLayoutStructure } from "phyloview";

new InitTreeStructure("#dendrogram", { content: "" })

// or
new InitRadialStructure("#dendrogram", { content: "" })

// or
InitTreeLayoutStructure("#dendrogram", {
    content: ""
    layout: "" // radial、tree
})
```

## 2 Import/Export

### 2.1 Overview

PhyloView supports a wide range of tree file formats. Import tree formats with Newick, Nexus, PhyloXML, and NeXML, while export file formats such as SVG and PNG.

### 2.2 Import

#### Newick

Newick is a common tree format. The following Newick text represents the tree shown in Figure 2.1.

```json
(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;
```

In the given text，brackets represent internal nodes. For example, `(C:0.3,D:0.4)E:0.5` indicates that node C and node D merge into node E along the branch, where the value after the colon represents the branch length.

![](../public/imgs/Newick.png)

<div style="text-align:center">Figure 2.1：A simple tree</div>

#### Nexus

Nexus is a popular tree format which is supported by many phylogenetic tools. 
Nexus files generally have `.nxs` and `.nex` extensions. The following Nexus file can be used to represent the tree shown in Figure 2.1.

```
#NEXUS
BEGIN TAXA;
      Dimensions NTax=6;
      TaxLabels A B C D E F;
END;
BEGIN TREES;
      Tree best=(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;
END;
```

In Nexus files, the first line must start with `#NEXUS`, besides, Nexus uses blocks to store data. As the Nexus file shows, in **TAXA block**, **DATA block**, **TREES block**, each block starts with `BEGIN`, and end with `END`. In these blocks, TAXA block is necessary. You can get more information through [Nexus documentation](http://wiki.christophchamp.com/index.php?title=NEXUS_file_format)

#### PhyloXML

PhyloXML is an XML language used to describe Phylogenetic trees and related data. The following PhyloXML text can be used to represent the tree in Figure 2.1

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phyloxml xmlns="http://www.phyloxml.org" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.phyloxml.org http://www.phyloxml.org/1.00/phyloxml.xsd">
<phylogeny rooted="true">
   <clade>
      <name>F</name>
      <clade branch_length = "0.1">
           <name>A</name>
      </clade>
      <clade branch_length = "0.2">
           <name>B</name>
      </clade>
      <clade branch_length = "0.5">
         <name>E</name>
         <clade branch_length = "0.3">
               <name>C</name>
         </clade>
         <clade branch_length = "0.4">
               <name>D</name>
         </clade>
      </clade>
   </clade>
</phylogeny>
</phyloxml>
```

It's not hard to see that if you just want to describe a simple tree, using PhyloXML will make this process more complex and less applicable.[Click to check more information about PhyloXML](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-10-356).

#### NeXML

NeXML is an XML based format. The following NeXML file can be used to represent the tree structure shown in Figure 2.1

```xml
<nex:nexml xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xsd="http://www.w3.org/2001/XMLSchema#" xmlns:map="http://phylomap.org/terms.owl#" xmlns="https://nexml.github.io/2009" xmlns:nex="https://nexml.github.io/2009" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" generator="Bio::Phylo::Project v.0.58" version="0.9" xsi:schemaLocation="https://nexml.github.io/2009 https://nexml.github.io/2009/nexml.xsd">
<otus id="os10">
    <otu id="ou11" label="A"/>
    <otu label="B" id="ou12"/>
    <otu label="C" id="ou13"/>
    <otu label="D" id="ou14"/>
</otus>
<trees otus="os10" id="ts2">
    <tree id="te3" xsi:type="nex:FloatTree">
        <node id="ne4" root="true" label="F"/>
        <node id="ne5" otu="ou11" label="A"/>
        <node otu="ou12" label="B" id="ne6"/>
        <node id="ne7" label="E"/>
        <node id="ne8" otu="ou13" label="C"/>
        <node id="ne9" label="D" otu="ou14"/>
        <edge source="ne4" id="edge5" target="ne5" length="0.1"/>
        <edge id="edge6" target="ne6" length="0.2" source="ne4"/>
        <edge id="edge7" target="ne7" length="0.5" source="ne4"/>
        <edge source="ne7" target="ne8" id="edge8" length="0.3"/>
        <edge source="ne7" length="0.4" target="ne9" id="edge9"/>
    </tree>
</trees>
</nex:nexml>
```

[NeXML official website](https://nexml.github.io/) provide many features such as `Nexus->NeXML`, `Newick->NeXML`, `NeXML->json`, `NeXML->rdf`.To get more information about NeXML, you can [click here](https://github.com/nexml/nexml/wiki/NeXML-Manual)

### 2.3 Export

#### SVG

SVG is a vector graphics format using XML, ensuring its image quality remains unaffected when zoomed in. Moreover, SVG files have smaller file sizes compared to PNG and JPEG, making them more suitable for network transmission.

#### PNG

PNG is a bitmap format, which adopts lossless compression algorithm, allowing for image compression while maintaining image quality and supporting transparency effects. 

PhyloView supports exporting tree structures to Newick format.

## 3 Display

### 3.1 Overview

Trees can be visualized with `phyloview.InitTreeStructure()`, a parameter in `InitTreeStructure` of type `object`, which enable the display or concealment of nodes, adjustment of legend, and styling of branches. For phyloviewGL.main.js, we ingragate the [phylocanvas.gl](https://www.phylocanvas.gl/docs/properties.html), check the link for detail property settings.

### 3.2 Basic settings

The basic settings support setting of the basic elements of the phylogenetic tree, such as node names, support values, branch length, leaf area mask, legend, scroll wheel activation, and more.

#### 3.2.1 Node name/Support value

With the display enabled, the result is shown in Figure 3.1.

![](../public/imgs/toolbar_show_node_name.png)

<div style="text-align:center">Figure 3.1: displaying node names</div>

#### 3.2.2 Branch length

Branch length is displayed if enabled.

![](../public/imgs/introduction_to_branch_length.png)

<div style="text-align:center">Figure 3.2: branch length</div>

#### 3.2.3 Sorting

PhyloView supports six sorting methods: default ascending, default descending, length ascending, length descending, name ascending, and name descending.

![](../public/imgs/branch_sort_by_branch_length_en.png)

<div style="text-align:center">Figure 3.3: length ascending/descending</div>

![](../public/imgs/branch_sort_by_node_name_en.png)

<div style="text-align:center">Figure 3.4: name ascending/descending</div>

#### 3.2.4 Scaling

PhyloView supports scaling operations along the X-axis and Y-axis.

![](../public/imgs\XYscaling_x_axis_comparison_en.png)

<div style="text-align:center">Figure 3.5: comparison of X-axis scaling</div>

![](../public/imgs\XYscaling_y_axis_comparison_en.png)

<div style="text-align:center">Figure 3.6 comparison of Y-axis scaling</div>

#### 3.2.5 Mask

When mask is on, the leaf area of the tree exhibits an opaque mask.

![](../public/imgs/mask_as_example.png)

<div style="text-align:center">Figure 3.7: Mask</div>

### 3.3 Styles

PhyloView supports legend, and allows users to edit branch, leaf and node styles.

#### 3.3.1 Legend

The legend feature facilitates regional segmentation and color matching within the area, as in Figure 3.8.

![](../public/imgs/legend_close_open.png)

<div style="text-align:center">Figure 3.8: legend feature (left is enabled while right is disabled)</div>

#### 3.3.2 Branch style

PhyloView allows for the adjustment of branch thickness and color, but if the **legend** feature is enabled, the color adjustment via **branch style** will not work.

![](../public/imgs/branch_style_with_different_color_and_size_en.png)

<div style="text-align:center">Figure 3.9: phylogenetic tree with different styles</div>

It is also possible to edit the dashed line, as shown in figure 3.10.

![](../public/imgs/extension_style_blue.png)

<div style="text-align:center">Figure 3.10: dashed lines</div>

#### 3.3.3 Branch type

Three branch types are supported in PhyloView.main.js: elbow, smooth and straight (shown in Figure 3.10). 

![](../public/imgs/elbow_smooth_line.png)

<div style="text-align:center">Figure 3.11: elbow, smooth and straight</div>

#### 3.3.4 Leaf style

PhyloView enables the customization of font, font color, and font size for the leaf node labels. However, enabling the **legend** feature will overwrite the color customization, leading to ineffective color changes.

![](../public/imgs/leaf_style_with_different_size_color_en.png)

<div style="text-align:center">Figure 3.12: phylogenetic trees with different branch and leaf styles</div>

#### 3.3.5 Node style

The node supports styles of pie charts and circles, as shown in Figure 3.13~3.15.

![](../public/imgs/pie_chart.png)

<div style="text-align:center">Figure 3.13: pie chart</div>

![](../public/imgs/filled_circle.png)

<div style="text-align:center">Figure 3.14: filled circle</div>

![](../public/imgs/empty.png)

<div style="text-align:center">Figure 3.15: empty circle</div>

### 3.4 Metadata

Metadata settings include tooltips and signs.

#### 3.4.1 Tooltips

Mouse over the leaf node name then appear the tooltips, as shown in Figure 3.12.

![](../public/imgs/tooltips_as_example.png)

<div style="text-align:center">Figure 3.16: tooltips</div>

#### 3.4.2 Signs

Bars, pies and other sign are supported.

![](../public/imgs/settings_global_font_style_arial_10px_red.png)

<div style="text-align:center">Figure 3.17: signs</div>

### 3.5 Branch optimization

The software offers the capability to display branch lengths using different scales, allowing for distinct scales among branches within the same tree to enhance clarity in distinguishing between branches

![](../public/imgs/multiple_scaling_showing_branch_length.png)

<div style="text-align:center">Figure 3.18: Multi scale display of branch length（<div style="color:blue">blue</div> is expanded to 10 times the original length, <div style="color:red">red</div> is expanded to 10 times the original length）</div>

## 4 Operations

### 4.1 Overview

PhyloView offers support for a variety of visual operations, including node and branch selection, tree structure transformations, and graphic area dragging.

### 4.2 Scaling and dragging

Scaling and dragging are supported in PhyloView.

![](../public/imgs/settings_open_mouse_control.gif)

<div style="text-align:center">Figure 4.1: Scaling and dragging</div>

### 4.3 Tree topology

PhyloView provides options for displaying phylogenetic trees in both rectangular and circular views.

<img src="../public/imgs/tree_structure_line.png" style="zoom:80%; ">

<div style="text-align:center">Figure 4.2: rectangular</div>

<img src="../public/imgs/tree_structure_circle.png" style="zoom:80%; " />

<div style="text-align:center">Figure 4.3: circular</div>

### 4.4 Shortcuts

This plugin supports marking subtree branches, editing subtrees, flipping subtrees, resetting trees, exporting selected branches, and downloading Newick structures.

![](../public/imgs/mouse_right_click_on_inner_node.png)

<div style="text-align:center">Figure 4.4: right click a node shows a menu</div>

![](../public/imgs/mouse_right_click_other_area.png)

<div style="text-align:center">Figure 4.5: right click a white area show a different menu</div>

## 5 Configuration

The configuration file is shown in Figure 5.1. The usage is as follows:

![](../public/imgs/locating_configs.png)

<div style="text-align:center">Figure 5.1: content is the config object</div>

### content

`string`

PhyloView supports Newick tree format. The following code shows a tree in Figure 2.1.

```json
content: "(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F";
```

### width

`number`

Set the canvas width to 1600 by default. If the value is too small, the tree will not be fully displayed.

![](../public/imgs/config.width_comparison.png)

<div style="text-align:center">Figure 5.2: width comparison</div>

### height

`number`

Set the height of the canvas. If the value is too small, the tree structure will not be fully displayed.

### sort

`string`

Set the sorting method for the tree structure. There are six optional sorting methods: defaultAsc, defaultDes, nameDes, nameAsc, lengthDes, lengthAsc. While defaultAsc and defaultDes sort according to the level of the node. The result of the following code is shown in Figure 5.4.

```json
sort = "nameDes"
```

![](../public/imgs/settings_length_des.png)

<div style="text-align:center">Figure 5.3: nodes are arranged in descending name order</div>

### size

`array`

No more than 2 values, where size[0] controls the horizontal stretching of the canvas, size[1] controls the width of the canvas, and size[1] is optional, as shown below:

```json
# Horizontal stretch value 800, canvas width 400
size = [800, 400]
# The horizontal stretch value is 400, and the canvas width equals with width
size = [400]
```

![](../public/imgs/XYscaling_x_axis_comparison_en.png)

<div style="text-align:center">Figure 5.4: lateral stretch comparison</div>

### position

`array`

Control the left margin and top margin, as shown in Figure 5.5:

```json
// The left margin is 20 and the top margin is 100
position=[20, 100]
```

![](../public/imgs/settings_position_comparison.png)

<div style="text-align:center">Figure 5.5：position comparison</div>

### separation

`number`
Adjust the longitudinal stretch value in the range [0,20]. The higher the value, the longer the longitudinal displayed of the tree.

```json
// The longitudinal stretch value is set to 10
position = 10
```

![](../public/imgs/XYscaling_y_axis_comparison_en.png)

<div style="text-align:center">Figure 5.6: longitudinal comparison</div>

### scale

`number`

The larger the overall stretch ratio, the greater the width and height of the phylogenetic tree.

```json
// The longitudinal stretch value is set to 10
scale = 1.2
```

![](../public/imgs/settings_scale_comparison.png)

<div style="text-align:center">Figure 5.7: scale comparison</div>

### stretch

 `object`

stretch.show： `boolean` , enable stretch.

stretch.data： `boolean` , range and scales.

Here is an example:

```json
// branches which length in [0.001,0.003),[0.003,0.005) and [0.005,0.008) will be expanded by 1, 2, 3 times respectively.
stretch: {
    "show": true,
    "data": [
        {
            "range": [
                0.001,
                0.003
            ],
            "multiple": 1,
            "color": "red"
        },
        {
            "range": [
                0.003,
                0.005
            ],
            "multiple": 2,
            "color": "blue"
        },
        {
            "range": [
                0.005,
                0.008
            ],
            "multiple": 3,
            "color": "green"
        }
    ]
}
```

![](../public/imgs/branch_optimization_as_example.png)

<div style="text-align:center">Figure 5.8: branch optimization</div>

### isCollapsible

`boolean`

Whether or not to allow the subtree to collapse. If enabled, users can click on any inner node to collapse the subtree, as shown in Figures 5.9 and 5.10.

```json
// Collapse feature is enabled
isCollapsible = true
```

![](../public/imgs/settings_locating_inner_node.png)

<div style="text-align:center">Figure 5.9: click node to collapse the subtree</div>

![](../public/imgs/settings_subtree_folded.png)

<div style="text-align:center">Figure 5.10: folding</div>

To unfold subtree, users can click the triangle symbol.

![](../public/imgs/settings_subtree_unfolded_from_folded.png)

<div style="text-align:center">Figure 5.11: unfold subtree</div>

### isPhylogram

`boolean`

If true, all leaf branches will be right-aligned, otherwise the branches will be displayed with their real branch length. As shown in Figure 5.12 and Figure 5.13

![](../public/imgs/settings_isPhylogram_is_false.png)

<div style="text-align:center">Figure 5.12：isPhylogram=true, align all leaf branches to the right</div>

![](../public/imgs/settings_isPhylogram_is_true.png)

<div style="text-align:center">Figure 5.13：isPhylogram=false, showing branches with branch length</div>

### isWheelZoom

`boolean`

If true, wheel scaling and phylogenetic tree dragging feature will be enabled 

![](../public/imgs/settings_open_mouse_control.gif)

<div style="text-align:center">Figure 5.14: slide the scroll wheel to zoom phylogenetic tree, and click to drag the screen</div>

### style

`object`

The global text style of the canvas, which can be overwritten with other styles.

style["font-family"]：`string` type, which is used to set the font-family, can be null, and it can be set to the following optional values`["Aria"、"Georgia"、"Verdana"、"Courier"、"Courier New"、"Times New Roman"、"Impact、Monotype Corsiva"]`，

style.fill：`string` type, is used to set color of the filled shape

style["font-size"]：`string` type, is used to set the font size

The result of following code is shown in Figure 5.15.

```json
// Set the font set to Monotype Corsiva and fill it with red color. The font size is 10px
style = {
	'font-family': "Arial",
	'fill': 'red',
    'font-size': "10px",
}
```

![](../public/imgs/settings_global_font_style_arial_10px_red.png)

<div style="text-align:center">Figure 5.15: global font style</div>

### leafs

`object`

Which is used to control the display of leafs area. The subparameters are shown as follows:

leafs.show：`boolean` type, leaves area will show if true value is set

leafs.dx： `number` type, horizontal offset of leaves area

leafs.dy：`number` type, vertical offset of leaves area

leafs.style：`object` type, text style of the leaves area

leafs.formatter：`function` type, which is a callback function, the parameter selection is an instance returned by d3.select, while data is another parameter containing data with each individual leaf node.

Result of the following code is shown in Figure 5.16.

```json
leafs = {
	show: true,
	dx: 0,
	dy: 0,
	style: {
        // Font is filled with blue
		fill: 'blue',
		// Note that this should be of type number and cannot be written as "12px", which is different from the style in other places
		'font-size': 12,
		'font-family': "Monotype Corsiva"
	},
    // Callback function
	formatter: function (select, data) {
        // If the branch length is greater than 0.5, then set the label size to 20px and set color to red
        if (data.data.length > 0.5) {
        	select.attr("font-size", "20px")
        	select.attr("fill", "red")
        }
	}
}
```

![](../public/imgs/settings_leafs.png)

<div style="text-align:center">Figure 5.16: leaf node style</div>

### extension

`object`

Controls properties of dashed lines.

```json
extension = {
    // The default value is true. If set false, the phylogenetic tree will be hidden
	show: true,
    // Dashed line style
	style: {
		stroke: '#aaa',
		'stroke-dasharray': 3,
		'stroke-width': 1,
	}
}
```

### mask

`object`

It is used to control the leaf node mask. The subparameters are shown as follows.

mask.show：`boolean` type, show mask on leaves

mask.dx： `number` type, horizontal offset of the mask

mask.dy：`number` type, vertical offset of the mask

mask.padding：`array` type, paddings of the mask

mask.style：`object` type, style of the mask

```json
mask = {
	show: true,
	dx: 0,
	dy: 0,
	padding: [10, 10],
	style: {
		opacity: 0.2
	}
}
```

![](../public/imgs/settings_leaf_mask.png)

<div style="text-align:center">Figure 5.17: leaf node mask styles</div>

### nodes

`object`

Properties of the nodes, sub properties are shown as follows:

nodes.value：`object`,  style of bootstrap values

nodes.collapse：`object`, style of triangular symbols

nodes.name：`object`, style of node names

nodes.shape：`object`, style of node shapes

```json
// This code relates to figure 5.18
nodes.value = {
	show: false,
    // Horizontal offset
	dx: -10,
    // Vertical offset
    dy: -5,
    style: {
    	"text-anchor": 'end',
        fill: '#000',
        'font-size': 10,
        'font-family': "sans-serif",
    },
    // Callback function
    formatter: function (select, data) {}
}
```

![](../public/imgs/settings_config_nodes_value.png)

<div style="text-align:center">Figure 5.18: bootstrap value</div>

```json
// This code relates to figure 5.19
nodes.collapse = {
    // Horizontal offset of the triangular symbol
	dx: 0,
    // Vertical offset of the triangular symbol
    dy: 0,
    // Rotation angle of the triangular symbol, if greater than 0 then shows clockwise rotation angle, else less than 0 then shows counterclockwise rotation angle
    rotate: 0,
    // Width and height of triangular symbol
    size: [30, 15],
    style: {
    	fill: 'lime',
        stroke: 'purple',
        'stroke-width': 1,
        cursor: 'pointer'
    },
    // Callback function
    formatter: function (select, data) {}
}
```

![](../public/imgs/settings_triangle_fold_symbol.png)

<div style="text-align:center">Figure 5.19: triangular fold symbol to the right</div>

```json
// This code relates to figure 5.20
nodes.name = {
    show: false,
    dx: 10,
    dy: 3,
    style: {
       "text-anchor": 'start',
       fill: '#000',
       'font-size': 10,
       'font-family': "sans-serif"
    },
    formatter: function (select, data) {}
}
```

![](../public/imgs/settings_config_nodes_name.png)

<div style="text-align:center">Figure 5.20: node names</div>

```json
// This code relates to figure 5.21~5.23
nodes.shape = {
    // Two optional value are supported: pie, circle
    type: 'pie',
    dx: 0,
	dy: 0,
    style: {
		"stroke-width": 1,
        fill: 'rgb(255, 120, 57)',
        stroke: "#333",
        cursor: 'pointer'
    },
    // type is set to circle
    circle: {
        // radius
    	r: 5,
        style: {
        	fill: 'red'
    	},
        // Callback function
        formatter: function (select, data) {}
    },
    // type is set to pie
    pie: {
        color: ['rgb(0, 255, 0)', 'red'],
        innerRadius: 0,
        outerRadius: 5,
        style: {},
        // Callback function
        formatter: function (select, data) {}
    }
}
```

![](../public/imgs/settings_inner_node_type_pie.png)

<div style="text-align:center">Figure 5.21: node type is set to pie</div>

![](../public/imgs/settings_inner_node_type_circle.png)

<div style="text-align:center">Figure 5.22: node type is set to circle</div>

![](../public/imgs/settings_inner_node_type_empty.png)

<div style="text-align:center">Figure 5.23: node style not displayed when node type is set to empty</div>

### links

`object`

Display branch style.

```json
// This code relates to the elbow diagram in Figure 5.24
links = {
	// The branch type can be set as elbow, smooth and line, representing elbow, smooth curve and straight line respectively
	type: 'elbow', 
	style: {},
	formatter: function (select, data) {}
}
```

![](../public/imgs/elbow_smooth_line.png)

<div style="text-align:center">Figure 5.24: elbow, smooth, line</div>

### legend

`object`

Display the legend

```json
// This code relates to figure 5.25
legend = {
	show: true,
    dx: 50,
    dy: 30,
    // Internal vertical spacing of the legend
    spacing: 10,
    style: {
        'font-size': 12,
        fill: '#333',
        'font-family': ''
    },
    // rect area
    rect: {
    	width: 40,
        height: 20,
        dx: -1400,
        dy: 0,
        style: {},
    },
    // text area
    text: {
        width: 20,
        height: 20,
        dx: -1400,
        dy: 0,
        style: {
            'text-anchor': "end"
        },
        formatter: function (select, text) {
            return text
        }
    },
    // Controls the rendering of the colors of all branch areas under the corresponding node
    data: [
    	{
        	name: "A",
            color: "#1f77b4"
        }, {
            name: "B",
            color: "#ff7f0e"
        }, {
            name: "E",
            color: "#2ca02c"
        }
    ]
}
```

![](../public/imgs/settings_legend.png)

<div style="text-align:center">Figure 5.25: legend</div>

### tooltips

 `object`

tooltips.show： `boolean` , show tooltips if set true

tooltips.data： `object` , specific data

```json
// This code relates to tooltips
tooltip: {
    "show": true,
    "data": {
        "Halobacterium_salinarum_90.515%": [
            {
                "label": "qqq",
                "value": "Halobacterium"
            },
            {
                "label": "qqq",
                "value": "salinarum"
            },
            {
                "label": "qqq",
                "value": "90.515%"
            }
        ]
    }
}
```

![](../public/imgs/tooltips_as_example.png)

<div style="text-align:center">Figure 5.26: tooltips</div>

### sign

`object`

Display signs. The sub attributes are as follows:

sign.show：`boolean`, show signs

sign.dx：`number`, horizontal offset

sign.dy：`number`, vertical offset

sign.data：`array`,  set shape of signs and mapping them on leaves. 

By setting the type of each element in sign.data.data, the display of thermal, circular, rectangular, rectangular, rectangular, text, Y, cross, prismatic, triangular, star, pie, histogram, custom image, etc. can be supported

The following code can be mapped to the tree structure shown in Figure 2.1 to show the heat sign.

```json
// Map to the tree structure shown in Figure 2.1 and set the sign map as heat sign, corresponding to Figure 5.27
sign = {
    show:true,
    dx:10,
    dy:0,
    data: [
        {
            label: { 
                spacing: 40,
            },
            data:{
                "A": {"type": "heatmap","data":[{"name":"ht1","style":{"font-size":"12px"}},{"name":"ht2","style":{"fill":"red","font-size":"12px"}},{"name":"ht3","style":{"fill":"green","font-size":"12px"}}]},
                "B": {"type": "heatmap","data":[{"name":"ht1","style":{"font-size":"12px"}},{"name":"ht2","style":{"fill":"yellow","font-size":"12px"}},{"name":"ht3","style":{"fill":"green","font-size":"12px"}}]},
                "C": {"type": "heatmap","data":[{"name":"ht1","style":{"font-size":"12px"}},{"name":"ht2","style":{"fill":"red","font-size":"12px"}},{"name":"ht3","style":{"fill":"green","font-size":"12px"}}]},
                "D": {"type": "heatmap","data":[{"name":"ht1","style":{"font-size":"12px"}},{"name":"ht2","style":{"fill":"red","font-size":"12px"}},{"name":"ht3","style":{"fill":"green","font-size":"12px"}}]},
                "E": {"type": "heatmap","data":[{"name":"ht1","style":{"font-size":"12px"}},{"name":"ht2","style":{"fill":"#ff0000","font-size":"12px"}},{"name":"ht3","style":{"fill":"green","font-size":"12px"}}]}
            }
        }
    ]
}
```

![](../public/imgs/settings_simple_heatmap_as_example.png)

<div style="text-align:center">Figure 5.27: heat sign</div>

```json
// Map to the tree structure shown in Figure 2.1, and set the sign to circle, corresponding to Figure 5.28
sign = {
    show:true,
    dx:10,
    dy:0,
    data: [
        {
            label : { 
                name: "circular shape",
                spacing: 40
            },
            data:{
                "A": {"type":"circle","name":"circle_1","size":1,"style":{"fill":"#00ff00"}},
                "B": {"type":"circle","name":"circle_1","size":1,"style":{"fill":"#ff0000"}},
                "C": {"type":"circle","name":"circle_1","size":1,"style":{"fill":"#0000ff"}},
                "D": {"type":"circle","name":"circle_1","size":1,"style":{"fill":"#ffff00"}},
                "E": {"type":"circle","name":"circle_1","size":1,"style":{"fill":"#0000ff"}}
            }
        }
    ]
}
```

![](../public/imgs/settings_simple_circle_as_example.png)

<div style="text-align:center">Figure 5.28: Circular sign</div>

```json
// Map to the tree structure shown in Figure 2.1 and set the sign to rectangle, corresponding to Figure 5.29
sign = {
    show:true,
    dx:10,
    dy:0,
    data: [
        {
            label : {
                name: "rectangular shape",
                spacing: 40
            },
            data:{
                "A": {"type":"rectangle","name":"rectangle","style":{"fill":"rgb(247, 190, 129)"}},
                "B": {"type":"rectangle","name":"rectangle","style":{"fill":"rgb(247, 190, 129)"}},
                "C": {"type":"rectangle","name":"rectangle","style":{"fill":"rgb(247, 190, 129)"}},
                "D": {"type":"rectangle","name":"rectangle","style":{"fill":"rgb(247, 190, 129)"}},
                "E": {"type":"rectangle","name":"rectangle","style":{"fill":"rgb(247, 190, 129)"}}
            }
        }
    ]
}
```

![](../public/imgs/settings_simple_rectangle_as_example.png)

<div style="text-align:center">Figure 5.29: rectangular sign</div>


```json
// Map to the tree structure shown in Figure 2.1, and set the flag to rect, corresponding to Figure 5.30
sign = {
    show:true,
    dx:10,
    dy:0,
    data: [
        {
            label : { 
                name: "rect sign",
                spacing: 40
            },
            data:{
                "A": {"type":"rect","name":"rect","size":1,"style":{"fill":"#ff0000"}},
                "B": {"type":"rect","name":"rect","size":1,"style":{"fill":"#00ff00"}},
                "C": {"type":"rect","name":"rect","size":1,"style":{"fill":"#0000ff"}},
                "D": {"type":"rect","name":"rect","size":1,"style":{"fill":"#ffff00"}},
                "E": {"type":"rect","name":"rect","size":1,"style":{"fill":"#00ffff"}}
            }
        }
    ]
}
```

![](../public/imgs/settings_simple_rect_as_example.png)

<div style="text-align:center">Figure 5.30: rect sign</div>

```json
// Map to the tree structure shown in Figure 2.1, and set the sign to text, corresponding to Figure 5.31
sign = {
    show:true,
    dx:10,
    dy:0,
    data: [
        {
            label : { 
                name: "text sign",
                spacing: 40
            },
            data:{
                "A": {"type":"text","name":"Q"},
                "B": {"type":"text","name":"C"},
                "C": {"type":"text","name":"E"},
                "D": {"type":"text","name":"R"},
                "E": {"type":"text","name":"T"}
            }
        }
    ]
}
```

![](../public/imgs/settings_simple_text_as_example.png)

<div style="text-align:center">Figure 5.31: text sign</div>

```json
// Map to the tree structure shown in Figure 2.1, and set the sign to Y-shape, corresponding to Figure 5.32
sign = {
    show:true,
    dx:10,
    dy:0,
    data: [
        {
            label : { 
                name: "Y-shaped sign",
                spacing: 40
            },
            data:{
                "A": {"type":"wye","name":"wye","style":{"fill":"#ff0000"}},
                "B": {"type":"wye","name":"wye","style":{"fill":"#00ff00"}},
                "C": {"type":"wye","name":"wye","style":{"fill":"#0000ff"}},
                "D": {"type":"wye","name":"wye","style":{"fill":"#ffff00"}},
                "E": {"type":"wye","name":"wye","style":{"fill":"#00ffff"}}
            }
        }
    ]
}
```

![](../public/imgs/settings_simple_y_shape_as_example.png)

<div style="text-align:center">Figure 5.32: Y-shaped sign</div>

```json
// Map to the tree structure shown in Figure 2.1, and set the sign to cross, corresponding to Figure 5.33
sign = {
    show:true,
    dx:10,
    dy:0,
    data: [
        {
            label : { 
                name: "cross sign",
                spacing: 40
            },
            data:{
                "A": {"type":"cross","name":"cross","style":{"fill":"#ff0000"}},
                "B": {"type":"cross","name":"cross","style":{"fill":"#00ff00"}},
                "C": {"type":"cross","name":"cross","style":{"fill":"#0000ff"}},
                "D": {"type":"cross","name":"cross","style":{"fill":"#ffff00"}},
                "E": {"type":"cross","name":"cross","style":{"fill":"#00ffff"}}
            }
        }
    ]
}
```

![](../public/imgs/settings_simple_cross_as_example.png)

<div style="text-align:center">Figure 5.33: cross sign</div>

```json
// Map to the tree structure shown in Figure 2.1, and set the sign is set to prism, corresponding to Figure 5.34
sign = {
    show:true,
    dx:10,
    dy:0,
    data: [
        {
            label : { 
                name: "prism sign",
                spacing: 40
            },
            data:{
                "A": {"type":"diamond","name":"diamond","style":{"fill":"#ff0000"}},
                "B": {"type":"diamond","name":"diamond","style":{"fill":"#00ff00"}},
                "C": {"type":"diamond","name":"diamond","style":{"fill":"#0000ff"}},
                "D": {"type":"diamond","name":"diamond","style":{"fill":"#ffff00"}},
                "E": {"type":"diamond","name":"diamond","style":{"fill":"#00ffff"}}
            }
        }
    ]
}
```

![](../public/imgs/settings_simple_diamond_as_example.png)

<div style="text-align:center">Figure 5.34: prism sign</div>

```json
// Map to the tree structure shown in Figure 2.1, and set the sign to triangular, corresponding to figure 5.35
sign = {
    show:true,
    dx:10,
    dy:0,
    data: [
        {
            label : { 
                name: "triangular sign",
                spacing: 40
            },
            data:{
                "A": {"type":"triangle","name":"triangle","style":{"fill":"#ff0000"}},
                "B": {"type":"triangle","name":"triangle","style":{"fill":"#00ff00"}},
                "C": {"type":"triangle","name":"triangle","style":{"fill":"#0000ff"}},
                "D": {"type":"triangle","name":"triangle","style":{"fill":"#ffff00"}},
                "E": {"type":"triangle","name":"triangle","style":{"fill":"#00ffff"}}
            }
        }
    ]
}
```

![](../public/imgs/settings_simple_triangle_as_example.png)

<div style="text-align:center">Figure 5.35: triangular sign</div>

```json
// Map to the tree structure shown in Figure 2.1 and set the sign to star, corresponding to Figure 5.36
sign = {
    show:true,
    dx:10,
    dy:0,
    data: [
        {
            label : { 
                name: "star sign",
                spacing: 40
            },
            data:{
                "A": {"type":"star","name":"star","style":{"fill":"#ff0000"}},
                "B": {"type":"star","name":"star","style":{"fill":"#00ff00"}},
                "C": {"type":"star","name":"star","style":{"fill":"#0000ff"}},
                "D": {"type":"star","name":"star","style":{"fill":"#ffff00"}},
                "E": {"type":"star","name":"star","style":{"fill":"#00ffff"}}
            }
        }
    ]
}
```

![](../public/imgs/settings_simple_star_as_example.png)

<div style="text-align:center">Figure 5.36: star sign</div>

```json
// Map to the tree structure shown in Figure 2.1 and set the sign to pie-shaped sign, corresponding to Figure 5.37
sign = {
    show:true,
    dx:10,
    dy:0,
    data: [
        {
            label : { 
                name: "pie-shaped sign",
                spacing: 40
            },
            data:{
                "A": {"type":"pie","name":"pie","data":[{"name":"gene1","value":1,"style":{"fill":"red","font-size":"12px"}},{"name":"gene2","value":1,"style":{"fill":"green","font-size":"12px"}},{"name":"gene3","value":1,"style":{"fill":"blue","font-size":"12px"}}]},
                "B": {"type":"pie","name":"pie","data":[{"name":"gene1","value":2,"style":{"fill":"red","font-size":"12px"}},{"name":"gene2","value":2,"style":{"fill":"green","font-size":"12px"}},{"name":"gene3","value":2,"style":{"fill":"blue","font-size":"12px"}}]},
                "C": {"type":"pie","name":"pie","data":[{"name":"gene1","value":1,"style":{"fill":"red","font-size":"12px"}},{"name":"gene2","value":2,"style":{"fill":"green","font-size":"12px"}},{"name":"gene3","value":3,"style":{"fill":"blue","font-size":"12px"}}]},
                "D": {"type":"pie","name":"pie","data":[{"name":"gene1","value":1,"style":{"fill":"red","font-size":"12px"}},{"name":"gene2","value":2,"style":{"fill":"green","font-size":"12px"}},{"name":"gene3","value":2,"style":{"fill":"blue","font-size":"12px"}}]},
                "E": {"type":"pie","name":"pie","data":[{"name":"gene1","value":1,"style":{"fill":"red","font-size":"12px"}},{"name":"gene2","value":2,"style":{"fill":"green","font-size":"12px"}},{"name":"gene3","value":2,"style":{"fill":"blue","font-size":"12px"}}]}
            }
        }
    ]
}
```

![](../public/imgs/settings_simple_pie_as_example.png)

<div style="text-align:center">Figure 5.37: pie-shaped sign</div>

```json
// Map to the tree structure shown in Figure 2.1, and set the sign to histogram, corresponding to Figure 5.38
sign = {
    show:true,
    dx:10,
    dy:0,
    data: [
        {
            label : { 
                name: "histogram",
                spacing: 40
            },
            data:{
                "A": {"type":"bar","name":"pie","data":[{"name":"gene1","value":10,"style":{"fill":"red",       "font-size":"12px"}},{"name":"gene2","value":10,"style":{"fill":"green","font-size":"12px"}},{"name":"gene3","value":10,"style":{"fill":"blue","font-size":"12px"}}]},
                "B": {"type":"bar","name":"pie","data":[{"name":"gene1","value":20,"style":{"fill":"red",       "font-size":"12px"}},{"name":"gene2","value":20,"style":{"fill":"green","font-size":"12px"}},{"name":"gene3","value":20,"style":{"fill":"blue","font-size":"12px"}}]},
                "C": {"type":"bar","name":"pie","data":[{"name":"gene1","value":10,"style":{"fill":"red",       "font-size":"12px"}},{"name":"gene2","value":20,"style":{"fill":"green","font-size":"12px"}},{"name":"gene3","value":30,"style":{"fill":"blue","font-size":"12px"}}]},
                "D": {"type":"bar","name":"pie","data":[{"name":"gene1","value":10,"style":{"fill":"red",       "font-size":"12px"}},{"name":"gene2","value":20,"style":{"fill":"green","font-size":"12px"}},{"name":"gene3","value":20,"style":{"fill":"blue","font-size":"12px"}}]},
                "E": {"type":"bar","name":"pie","data":[{"name":"gene1","value":10,"style":{"fill":"red",       "font-size":"12px"}},{"name":"gene2","value":20,"style":{"fill":"green","font-size":"12px"}},{"name":"gene3","value":20,"style":{"fill":"blue","font-size":"12px"}}]}
            }
        }
    ]
}
```

![](../public/imgs/settings_simple_bar_as_example.png)

<div style="text-align:center">Figure 5.38: histogram</div>

```json
// Set the sign to cutomized picture, relating to Figure 5.39
sign: {
    show: true,
    dx: 10,
    dy: 0,
    data: [
        {
            label: {
                name: "Cutomized picture",
                spacing: 40
            },
            "data": {
                "A": {
                    "type": "image",
                    "show": true,
                    "name": "phyloview",
                    "href": "./logo.png",
                    "rotate": 0,
                    "dx": 0
                }
            }
        }
    ]
}
```

![](../public/imgs/logo.png)

<div style="text-align:center">Figure 5.39: cutomized picture</div>

## 6 Online platform based on PhyloView

### 6.1 Overview

We have developed an online phylogenetic tree application platform based on PhyloView, which not only supports basic phylogenetic tree interaction, but also allows the smooth visualization of large phylogenetic trees with millions of nodes, supports the interaction of phylogenetic trees with geospatial information, statistical graphs and protein structure information, and allows users to create and share their own thematic content.

We have created an online platform for phylogenetic tree applications built upon PhyloView. This platform not only supportss fundamental interaction with phylogenetic trees but also enables seamless visualization of extensive trees with millions of nodes. Additionally, it supports the integration of phylogenetic trees with extensible plugins including geospatial information, statistical graphs, and protein structure details.

### 6.2 Visualization and interaction

#### 6.2.1 Simple tree visualization

Select panel, and tree styles, click the `Tree File Upload` button and then upload tree files:

![](../public/imgs/platform_basic_tree.png)

<div style="text-align:center">Figure 6.1: upload tree files</div>

![](../public/imgs/platform_circular_tree.png)

<div style="text-align:center">Figure 6.2: a simple tree</div>

#### 6.2.2 Large tree visualization

The large tree visualization feature is constructed using WebGL, enabling smooth rendering of millions of nodes.

![](../public/imgs/platform_huge_tree.png)

<div style="text-align:center">Figure 6.3: large tree</div>

#### 6.2.3 Scalable plugins
We present three distinct themes of plugins: geographic maps, statistical diagrams, and protein structures. For detail information, visit [Plugins](http://darwintree.cn/PhyloView/#/plugins)

Interation with protein structure

Select `PDB` plugin, upload a tree file (Figure 6.1) and protein structure files (Figure 6.4), users can click the leaf node to get protein structure information, as shown in Figure 6.5:

![](../public/imgs/platform_pdb_list.png)

<div style="text-align:center">Figure 6.4: upload tree files</div>

![](../public/imgs/platform_pdb_interaction.png)

<div style="text-align:center">Figure 6.5: click label to show current protein structure</div>

Interaction with pathogen data

Select `MapTransmission` plugin, Through uploading the tree file (Figure 6.1) and editing the pathogen geospatial data (Figure 6.6), interaction between the tree and pathogen geospatial data can be conducted, as shown in Figure 6.7:

![](../public/imgs/platform_virus_edit.png)

<div style="text-align:center">Figure 6.6: editing pathogen geospatial data</div>

![](../public/imgs/platform_virus_interaction.png)

<div style="text-align:center">Figure 6.7: pathogen geospatial visualization</div>

### 6.3 Sharing

Authenticated users can generate links for sharing self-designed trees.

#### 6.3.1 Create a link

Login users can create a link for the current tree, and other users can directly access the tree through this link:

![](../public/imgs/platform_create_link.png)

<div style="text-align:center">Figure 6.8: create a sharing link</div>

#### 6.3.2 Share a link

Users can view the link at [Gallery](http://darwintree.cn/PhyloView/#/gallery):

![](../public/imgs/platform_view_links.png)

<div style="text-align:center">Figure 6.9: view a list</div>
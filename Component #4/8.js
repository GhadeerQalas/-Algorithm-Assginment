 // CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Transitive Closure Package
// 2019, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed
//


var _v = [], _e = [];   // note naming conventions in upload guide


// -----------------------------------------------------------------------
/**
 * Represents a function
 * @function main
 * @author Ghadeer Qalas
 * @comment in this function I will create a graph  and check of connectivity  of dfs and bfs
 */
function _main()
{
	// create a graph (default undirected)
	var g = new Graph();

   // set input graph properties (label, directed etc.)
	g.label = "{Figure 8.11 (Levitin, 3rd edition)}";
	g.digraph = true;
   // use global input arrays _v and _e to initialize its internal data structures
	g.read_graph(_v,_e);

   // use print_graph() method to check graph
	g.print_graph();

   // report connectivity status if available
	//var connectivity_ = g.numConnectComps;
	g.connectedComp = g.topoSearch(g.connectedComp, "dfs");
	console.log("the connectivity is?  ",g.connectedComp);

	document.write("<p>dfs_push: ", g.dfs_push, "</p>");


   // report connectivity status if available
	console.log("the connectivity is222?  ",g.connectedComp);
	if (g.connectedComp >1 ){
		document.write("<p>DISCONNECTED  ", g.connectedComp, "</p>");
	}else if (g.connectedComp ==0){
		document.write("<p>no connectivity info </p>");
	}else if (g.connectedComp ==1){
		document.write("<p>CONNECTED </p>");
	}

   // perform breadth-first search and output stored result
	g.topoSearch(g.connectedComp, "bfs");
	document.write("<p>bfs_order: ", g.bfs_out, "</p>");

	g.DfsTC();
	document.write("<p>TC matrix:</p>");
	for (var i = 0; i < g.dfsTC.length; i++)
	{
		document.write(g.dfsTC[i], "</br>");
	}
} // end function


// -----------------------------------------------------------------------
/**
 * Represents a function
 * @function vertex
 * @author Ghadeer Qalas
 */
function Vertex(v)
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments
	// no JSDOC comments in this section

	// base property fields from P1M1
	this.label = v.label;  // ... complete from P1M1 (remove comment)
	this.visit = false;
	this.adjacent = new List();

	// base member methods from P1M1
	this.adjacentByID = adjacentByID;
	this.list_vert_ = list_vert;
	// --------------------
	// more student fields next
	// --------------------
	// more student methods next

}

// -----------------------------------------------------------------------
/**
 * @function edge
 * @author Ghadeer Qalas
 * @returns vertex and wieght
 */
function Edge(vert_i,weight)
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments
	// no JSDOC comments in this section

	// base property fields
	this.target_v = vert_i;  // ... complete from P1M1 (remove comment)
	if (weight == undefined)
	{
		this.weight = null;
	} else
	{
		this.weight = weight;
	}

}


// -----------------------------------------------------------------------
/**
 * Represents a function
 * @function graph
 * @author Ghadeer Qalas
 */
function Graph()
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments
	// no JSDOC comments in this section
	// base property fields

	this.vert = [];
	this.nv = 0;  // ... etc. from P1M1 (remove)

	this.ne = 0;
	this.digraph = false;
	this.weighted = false;
	this.dfs_push = [];
	this.bfs_out = [];
	this.label = "";

    this.connectedComp=0;
	// base member methods

	this.read_graph = better_input;  // ... (complete next)
	this.add_edge = addEdgeImpl;
	this.print_graph = better_output;

	// --------------------
	// more student fields next


	// --------------------
	// more student methods next

	// transitive closure package (requirements in line comments, to be removed and replaced by JSDOCs)

//	this.hasPath                   // boolean, true if path exists between vertices v_i, v_j in digraph
//	this.shortestPath              // return distance of shortest path between v_i, v_j in weighted graph
//	this.isDAG                     // boolean, true if acyclic digraph
//	this.warshallFloyd             // inserts .tc field in adjacency matrix if digraph, and .dist if weighted
	this.component_P = printComponent;
	this.topoSearch = topoSearch_;
	this.dfsTC = [];
	this.dfs = dfs;
	this.bfs = bfs;
	this.DfsTC = DfsTCMat;                   // return TC matrix for digraph based on a dfs
}


// -----------------------------------------------------------------------
// functions used by methods of Graph and ancillary objects

// -----------------------------------------------------------------------
// begin student code section
// -----------------------------------------------------------------------

// transitive closure package

function hasPathImpl()
{

}


// -----------------------------------------------------------------------
// published docs section (ref. assignment page)
// use starter6-based P1M1 code as-is (fixes/improvements OK)
// no JSDOC comments in this section (docs already published)
// -----------------------------------------------------------------------


// --------------------
/**
 * Represents a function
 * @function input
 * @author Ghadeer Qalas
 * @elements vertex and edge
 * @comment check if this function weighted or not and digraph length
 */
function better_input(v, e) // default graph input method
{
	this.nv=v.length;
	this.ne=e.length;

	var i;
	for (i=0; i<this.nv; i++){
		this.vert[i]= new Vertex(v[i]);
	}

   var k;
   for (k=0; k<this.ne; k++){
	   this.add_edge(e[k].u,e[k].v,e[k].w )
   }

	if (this.digraph==false){
		this.ne= e.length * 2;
	}
	if (!e[0].w == undefined){
		this.weighted =true;
	}

}

// --------------------
function addEdgeImpl(u_i,v_i, weight)
{
	var id_u = this.vert[u_i];
	var id_v = this.vert[v_i];
	var edge = new Edge(v_i, weight);
	id_u.adjacent.insert(edge);

	if (this.digraph==false){
		edge = new Edge(u_i, weight);
		id_v.adjacent.insert(edge);
	}
}

// --------------------

/**
 * Represents a function
 * @function toplogical search
 * @author Ghadeer Qalas
 * @return counter
 * @elements counter and type of Algorithms
 *
 */
function topoSearch_(counter, type)
{
	var i;
	for (i = 0; i < this.nv; i++)
	{
		this.vert[i].visit = false;
	}
	var j;
	for (j = 0; j < this.nv; j++)
	{
			if (!this.vert[j].visit)
			{
				if (type == "dfs"){
					counter++;
					this.dfs(j);

				}
				else{
					this.bfs(j);
				}
			}
	}
	return counter;
}

// --------------------
/**
 * Represents a function
 * @function  dfs
 * @author Ghadeer Qalas
 * @return counter
 * @elements vertex
 *
 */
function dfs(v_i)
{
	v=this.vert[v_i];
	v.visit=true;

	this.dfs_push.push(v_i);

	var w;
	w= v.adjacentByID();
	var i;
	for (i=0; i<w.length; i++){
		if (!this.vert[w[i]].visit){
			this.dfs(w[i]);
		}
	}
}

// --------------------
/**
 * Represents a function
 * @function  bfs
 * @author Ghadeer Qalas
 * @elements vertex
 *
 */
function bfs(v_i)
{
	var v = this.vert[v_i];

	v.visit=true;
	this.bfs_out.push(v_i);

	var Que =new Queue();
	Que.enqueue(v);


	while(!Que.isEmpty()){

		var U = Que.dequeue();
		var w= U.adjacentByID();

		var i;
		for (i=0; i<w.length; i++){
			if (!this.vert[w[i]].visit){
				this.vert[w[i]].visit=true;
				Que.enqueue(this.vert[w[i]]);
				this.bfs_out.push(w[i]);
				for (var h=0 ; h< this.bfs_out.length;h++ ){
					if (this.bfs_out[h] != w[i]){

					}
				}
			}

		}
	}
}
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

//----------------------------
function adjacentByID()
{
	var adjacentArrID = [];
	var edge_N = this.adjacent.traverse();
	var i;
	for (i = 0; i < edge_N.length; i++) {
		adjacentArrID[i] = edge_N[i].target_v;
	}
	return adjacentArrID;
}
//-------------------------

function DfsTCMat()
{

	for (var i = 0; i < this.nv; i++)
	{
	var v = this.vert[i];

	for (var j = 0; j < this.nv; j++)
	{
		this.vert[j].visit = false;
	}

	this.dfsTC[i] = [];
	for (var j = 0; j < this.nv; j++)
	{
		this.dfsTC[i][j] = 0;
	}

	var w = v.adjacentByID();
	for (var k = 0; k < w.length; k++)
	{
		this.dfs(w[k]);
	}

	for (var h = 0; h < this.nv; h++)
	{
		if (this.vert[h].visit)
		{
			this.dfsTC[i][h] = 1;
		}
	}
}

}
//----------------------------
/**
 * Represents a function
 * @function  printComponent
 * @author Ghadeer Qalas
 * @return connectivity or not
 *
 */
function printComponent()
{

if (this.connectedComp == 0)
{
	return ("no connectivity info");
} else if (this.connectedComp > 1)
{
	return ("CONNECTED");
} else if (this.connectedComp == 1)
 {
	return ("DISCONNECTED " + this.connectedComp);
}

}
//-------------

function better_output()
{

document.write("<p>GRAPH {", this.label, "} " , this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ", this.ne, " EDGES:</p>");
document.write("<p> ", this.component_P(), "</p>");

// list vertices
for (var i = 0; i < this.nv; i++)
{
	var v = this.vert[i];
	document.write("VERTEX: ", i, v.list_vert_(), "<br>");
}
}

function list_vert()
 {

return ("{" + this.label + "} - VISIT: " + this.visit +
	" - ADJACENCY: " + this.adjacentByID());

}

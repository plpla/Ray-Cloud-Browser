/*
 *  Ray Cloud Browser: interactively skim processed genomics data with energy
 *  Copyright (C) 2012  Sébastien Boisvert
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, version 3 of the License.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * The data store is the backend for data
 * retrieval.
 *
 * \author Sébastien Boisvert
 */
function DataStore(kmerLength){
	
/*
 * globalStore is a global variable.
 */
	this.store=globalStore;

	this.VALUE_COVERAGE=0;
	this.VALUE_PARENTS=1;
	this.VALUE_CHILDREN=2;

	this.graphFiles=new Array();
	this.sequenceFiles=new Array();

	this.graphFiles.push("mock-kmers.txt");
	this.sequenceFiles.push("mock-Contigs.fasta");

/*
 * Pick up a starting key.
 */
	for(key in this.store){
		var entry=this.store[key];

		if(entry[1].length>=1 && entry[2].length >=1 && entry[0]>=10){
			this.firstKmer=key;
			break;
		}
	}
	
	this.kmerLength=this.firstKmer.length;
}

DataStore.prototype.getSequenceFiles=function(){
	return this.sequenceFiles;
}

DataStore.prototype.getKmerLength=function(){
	return this.kmerLength;
}

DataStore.prototype.getGraphFiles=function(){
	return this.graphFiles;
}

DataStore.prototype.getFirstKmer=function(){

	var prefix=this.firstKmer;

	return prefix;
}

DataStore.prototype.getKmerInformation=function(kmerSequence){

	var coverage=0;
	var parents=new Array();
	var children=new Array();

	if(kmerSequence in this.store){
		coverage=this.store[kmerSequence][this.VALUE_COVERAGE];
		parents=this.store[kmerSequence][this.VALUE_PARENTS];
		children=this.store[kmerSequence][this.VALUE_CHILDREN];
	}

	var kmer=new Kmer(kmerSequence,coverage,parents,children);

	return kmer;
}


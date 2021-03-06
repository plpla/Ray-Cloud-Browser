/*
 *  Ray Cloud Browser: interactively skim processed genomics data with energy
 *  Copyright (C) 2012, 2013 Sébastien Boisvert
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

#include "JSONParser.h"

#include <string>
#include <iostream>
using namespace std;

int main(int argc,char**argv){

	if(argc!=2){
		cout<<"Parse a json file."<<endl;
		cout<<argv[0]<<" test.json"<<endl;
		
		return 1;
	}

	const char*file=argv[1];

	JSONParser parser;
	parser.parse(file);

	parser.printFile();

	return 0;
}

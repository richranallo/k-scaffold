const fs = require('fs/promises');

const kStatus = require('./kStatus');
const resolvePaths = require('./resolvePaths');
const renderSASS = require('./renderSASS');
const renderPug = require('./renderPug');
const renderTemplates = require('./renderTemplates');

const isSASS = async ({entry,source:resSource,destination:resDest,options,runSCSS,sfcStyles}) => {
  if(runSCSS && entry.name.endsWith('.scss')){
    kStatus(` Processing ${entry.name} `);
    return renderSASS({source:resSource,destination:resDest,options,sfcStyles});
  }
};

const isPUG = async ({entry,source:resSource,destination:resDest,testDestination,options,runPUG,templates}) => {
  if(runPUG && entry.name.endsWith('.pug')|| entry.name.endsWith('.kscaf')){
    kStatus(` Processing ${entry.name} `);
    return renderPug({source:resSource,destination:resDest,testDestination,options,templates});
  }
  return [];
};

const processSheet = async ({source ='./',destination,dynamicDestination = false,testDestination,pugOptions={suppressStack:true},scssOptions={},runSCSS=true,runPUG=true, templates}) => {
  const files = await fs.opendir(source);
  const pugPromises = [];
  const scssPromises = [];
  const destinations = {};
  const sfcStyles = {};
  for await (entry of files){
    if(entry.isFile() && !entry.name.startsWith('_') && (
      entry.name.endsWith('.pug') ||
      entry.name.endsWith('.scss')
    )){
      const [resSource,resDest] = resolvePaths(source,destination,dynamicDestination,entry);
      const [,destDir,fileName] = resDest.match(/(.+?)[\\\/]([^\\\/]+)$/) || [];
      if(destDir && fileName){
        destinations[destDir] = destinations[destDir] || [];
        destinations[destDir].push(fileName);
      }

      const [newPUG,sfc] = await isPUG({entry,source:resSource,destination:resDest,testDestination,options:pugOptions,runPUG,templates});
      // debugger;
      if(sfc){
        sfcStyles[entry.name.replace(/(?:pug)$/,'scss')] = sfc;
      }
      const newSASS = await isSASS({entry,source:resSource,destination:resDest,options:scssOptions,runSCSS,sfcStyles:sfcStyles[entry.name]});

      if(newSASS){
        scssPromises.push(newSASS);
      }
      if(newPUG){
        pugPromises.push(newPUG);
      }
    }
  }
  const pugOutput = await Promise.all(pugPromises);
  const scssOutput = await Promise.all(scssPromises);
  const templateOutput = await renderTemplates(destinations,templates);
  return [pugOutput,scssOutput,templateOutput];
};

module.exports = processSheet;
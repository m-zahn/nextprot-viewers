this["HBtemplates"] = this["HBtemplates"] || {};

this["HBtemplates"]["app/templates/apiCallFail.tmpl"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"col-md-12\">\n    <div class=\"panel panel-danger\">\n        <div class=\"panel-heading\">\n            Impossible to get the data !\n        </div>\n        <div class=\"panel-body\">\n            "
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "\n        </div>\n    </div>\n</div>";
},"useData":true});

this["HBtemplates"]["app/templates/limitExceeded.tmpl"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"col-md-12\">\n    <div class=\"panel panel-danger\">\n        <div class=\"panel-heading\">\n            Limit exceeded !\n        </div>\n        <div class=\"panel-body\">\n            You have exceeded the maximum number of <strong>1000</strong> peptides.\n        </div>\n    </div>\n</div>";
},"useData":true});

this["HBtemplates"]["app/templates/matchingEntries.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "proteoWithVariant";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.onlyWithVariant : stack1),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "proteoWithoutVariant";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.withoutVariant : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    return "<div  class=\"panel panel-success panel-wo-variant\" style=\"margin:0px;min-height: 120px;\">\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.nullWithoutVariant : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    return "<div class=\"panel panel-default panel-wo-variant\" style=\"margin:0px;min-height: 120px;\">\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"panel panel-info panel-wo-variant\" style=\"margin:0px;min-height: 120px;\">\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "                        <li>No entries found</li>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.withoutVariant : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <li class=\"foundIn\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " <em> ( Gene Name : "
    + alias4(((helper = (helper = helpers.geneName || (depth0 != null ? depth0.geneName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"geneName","hash":{},"data":data}) : helper)))
    + " )</em></li>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n\n"
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.variant : depth0),{"name":"unless","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"21":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <li class=\"foundIn\">"
    + container.escapeExpression(((helper = (helper = helpers.isoform || (depth0 != null ? depth0.isoform : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"isoform","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.withVariant : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.program(26, data, 0),"data":data})) != null ? stack1 : "")
    + "\n";
},"24":function(container,depth0,helpers,partials,data) {
    return "<div  class=\"panel panel-success panel-w-variant\" style=\"margin:0px;min-height: 120px;\">\n        ";
},"26":function(container,depth0,helpers,partials,data) {
    return "<div class=\"panel panel-info panel-w-variant\" style=\"margin:0px;min-height: 120px;\">";
},"28":function(container,depth0,helpers,partials,data) {
    return "                        <li>No other entries found</li>\n";
},"30":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.withVariant : depth0),{"name":"if","hash":{},"fn":container.program(31, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"31":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <li class=\"variantIntoAccount\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " <em> ( Gene Name : "
    + alias4(((helper = (helper = helpers.geneName || (depth0 != null ? depth0.geneName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"geneName","hash":{},"data":data}) : helper)))
    + " )</em></li>\n";
},"33":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(34, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"34":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.variant : depth0),{"name":"if","hash":{},"fn":container.program(35, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"35":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "                        <li class=\"variantIntoAccount\">"
    + alias1(((helper = (helper = helpers.isoform || (depth0 != null ? depth0.isoform : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"isoform","hash":{},"data":data}) : helper)))
    + " ("
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.positions : depth0)) != null ? stack1.first : stack1), depth0))
    + " : "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.variant : depth0)) != null ? stack1.original : stack1), depth0))
    + " →\n                            "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.variant : depth0)) != null ? stack1.variant : stack1), depth0))
    + ")\n                        </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=helpers.blockHelperMissing, buffer = 
  "<div id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " class=\"col-md-4 peptide "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.withVariant : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.withoutVariant : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n<div id=\"proteoBlock\" class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n        <h5 class=\"text-center\" style=\"margin:0px;\">"
    + alias4(((helper = (helper = helpers.peptide || (depth0 != null ? depth0.peptide : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"peptide","hash":{},"data":data}) : helper)))
    + "</h5>\n    </div>\n<div id=\"proteoBody\" class=\"panel-body\" style=\"padding:0px;height:240px;overflow:auto;\">\n                        \n    <div class=\"pull-right\" style=\"margin-top:8px;margin-right: 15px;\">\n        <button id=\"showIsoforms\" type=\"button\" class=\"btn btn-default btn-xs\">Show isoforms</button>\n    </div>\n    <div id=\"proteomeProperties\">\n        <!--<div style=\"border-bottom:1px solid #E7EAEC;margin-top: -10px;margin-bottom:5px;\">-->\n        <!--<h5 id=\"proteotypicitySentence\"></h5>-->\n        <!--</div>-->\n";
  stack1 = ((helper = (helper = helpers.proteotypicity || (depth0 != null ? depth0.proteotypicity : depth0)) != null ? helper : alias2),(options={"name":"proteotypicity","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.proteotypicity) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "            <div class=\"panel-heading\" style=\"padding:1px 15px\">\n                <h5>Entry mapping</h5>\n            </div>\n            <div class=\"panel-body\">\n                <div class=\"showEntry\" style=\"display:block\">\n                    <ul>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.nullWithoutVariant : stack1),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
  stack1 = ((helper = (helper = helpers.entries || (depth0 != null ? depth0.entries : depth0)) != null ? helper : alias2),(options={"name":"entries","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.entries) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </ul>\n                </div>\n                <div class=\"showIsoform\" style=\"display:none\">\n                    <ul>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.nullWithoutVariant : stack1),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                        ";
  stack1 = ((helper = (helper = helpers.isoforms || (depth0 != null ? depth0.isoforms : depth0)) != null ? helper : alias2),(options={"name":"isoforms","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.isoforms) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </ul>\n                </div>\n            </div>\n        </div>\n";
  stack1 = ((helper = (helper = helpers.proteotypicity || (depth0 != null ? depth0.proteotypicity : depth0)) != null ? helper : alias2),(options={"name":"proteotypicity","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.proteotypicity) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "            <div class=\"panel-heading\" style=\"padding:1px 15px\">\n                <h5>Additional mappings with known variants</h5>\n            </div>\n            <div class=\"panel-body\">\n                <div class=\"showEntry\" style=\"display:block\">\n                    <ul>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.nullWithVariant : stack1),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
  stack1 = ((helper = (helper = helpers.entries || (depth0 != null ? depth0.entries : depth0)) != null ? helper : alias2),(options={"name":"entries","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.entries) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </ul>\n                </div>\n                <div class=\"showIsoform\" style=\"display:none\">\n                    <ul>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.nullWithVariant : stack1),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                        ";
  stack1 = ((helper = (helper = helpers.isoforms || (depth0 != null ? depth0.isoforms : depth0)) != null ? helper : alias2),(options={"name":"isoforms","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.isoforms) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n    </div>\n    </div>\n    </div>";
},"useData":true});

this["HBtemplates"]["app/templates/notFound.tmpl"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"col-md-12\">\n    <div class=\"panel panel-danger\">\n        <div class=\"panel-heading\">\n            Peptide not found !\n        </div>\n        <div class=\"panel-body\">\n            The peptide <strong>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)))
    + "</strong> has not been found in our database. Please check again the sequence or enter a new peptide.\n        </div>\n    </div>\n</div>";
},"useData":true});

this["HBtemplates"]["app/templates/warningPanel.tmpl"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"col-md-12\">\n    <div class=\"alert alert-warning\" style=\"padding:7px 15px;\">\n            <strong>Warning! </strong> "
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "\n    </div>\n</div>";
},"useData":true});
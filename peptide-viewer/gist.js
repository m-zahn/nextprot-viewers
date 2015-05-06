/////////////
function initNXDivs() {

    var Nextprot = window.Nextprot;
    var nx = new Nextprot.Client("SequenceViewer", "nextprotTeam");
    var nxEntryName = nx.getEntryName();
    var cpt = 0;
    var isoforms;
    var annotations;
    var peptideMappings;
    var srmPeptideMappings;
    var matureProtein;
    var seq1 = null;


    (function ($) {e
        $.fn.hasVerticalScrollBar = function () {
            return this.get(0) ? this.get(0).scrollHeight > this.innerHeight() : false;
        }
    })(jQuery);

    function nxPviz(annotations, isoforms) {
        if ($("#main").length > 0) {
            var pviz = this.pviz;

            var seq = isoforms[0].sequence;
            var seqEntry = new pviz.SeqEntry({
                sequence: seq
            });

            var view = new pviz.SeqEntryAnnotInteractiveView({
                model: seqEntry,
                el: '#main'
            });
            $("#main").prepend("<div style=\"border-bottom: 1px solid #E7EAEC;padding-bottom:5px;margin-bottom: 15px;\">" +
            "<div style=\"display:inline-block;\">" +
            "<span id=\"numberOfFeatures\" class=\"badge\" style=\"background:#C50063;color:white;padding:8px;border-radius:50%;margin-right:10px;vertical-align:middle;\"></span>" +
            "</div><h4 style=\"display:inline-block;vertical-align:middle;\">Secondary structure</h4></div>");
            //Setting secondary structure
            var features = [];
            $("#numberOfFeatures").text(annotations.length);
            annotations.forEach(function (annot) {
                var isoform1 = nxEntryName + "-1";
                features.push({
                    category: 'secondary structure',
                    type: (annot.category === "beta strand") ? "beta_strand" : annot.category,
                    start: annot.targetingIsoformsMap[isoform1].firstPosition,
                    end: annot.targetingIsoformsMap[isoform1].lastPosition
                });
            });
            //Adding features
            seqEntry.addFeatures(features);
            //Render at the end
            view.render();
        }
    }
    var getInfoForIsoform = {
        firstLoad: function () {
            RenderSequenceForIsoform(isoforms, nxEntryName + "-1");
            RenderPeptidesForIsoform(peptideMappings, nxEntryName + "-1");
        },
        Isoform: function () {
            $(".isoformNames").click(getInfoForIsoform.reload);
            $("#moreIsoforms a").click(function () {
                var parentThis = $(this).text();
                console.log(parentThis);
                $("#extendIsoformChoice").text(parentThis);
            });
        },
        reload: function (event) {
            var isoID = $(this).text();
            $("#nx-detailedPeptide").html("");
            $("#nx-detailedPeptide").hide("slow");
            RenderSequenceForIsoform(isoforms, isoID);
            RenderPeptidesForIsoform(peptideMappings, isoID);

        },
        Peptides: function (peptideMappings, isoName) {
            var peptideMap = [];
            var dateStart = new Date().getTime();
            peptideMappings.forEach(function (o) {
                if (o.isoformSpecificity[isoName]) {
                    for (var i = 0; i < o.isoformSpecificity[isoName].positions.length; i++) {
                        var peptide = {
                            "name": o.peptideUniqueName,
                            "position": o.isoformSpecificity[isoName].positions[i],
                            "length": 0,
                            "properties": {
                                "natural": o.natural,
                                "synthetic": o.synthetic,
                                "proteotypic": o.proteotypic
                            },
                            "isoformProteotypicity": "-",
                            "tissueSpecificity": o.evidences.map(function (p) {
                                return p.assignedBy
                            }),
                            "sequence": "",
                            "prePeptide": "",
                            "postPeptide": "",
                            "include": [],
                            "includedIn": [],
                            "sources": o.evidences.map(function (q) {
                                return q.databaseName
                            }).filter(function (elem, index, self) {
                                return index == self.indexOf(elem);
                            })
                        };
                        //if (o.natural === true) peptide.properties.push("natural");
                        //else peptide.properties.push("-");
                        if (o.proteotypic === true) {
                            //peptide.properties.push("proteotypic");
                            if (Object.keys(o.isoformSpecificity).length === 1) peptide.isoformProteotypicity = "Yes";
                        }
                        //else peptide.properties.push("-");
                        //if (o.synthetic === true) peptide.properties.push("synthetic");
                        //else peptide.properties.push("-");

                        peptide.length = peptide.position.second - peptide.position.first + 1;

                        peptide.sequence = getInfoForIsoform.Sequence(isoforms, isoName).slice(peptide.position.first - 1, peptide.position.second);

                        peptide.prePeptide = getInfoForIsoform.Sequence(isoforms, isoName)[peptide.position.first - 2];
                        peptide.postPeptide = getInfoForIsoform.Sequence(isoforms, isoName)[peptide.position.second + 1];
                        peptideMap.push(peptide);
                    }
                }
            });
            peptideMap.sort(function(a, b) {
                return a.length - b.length;
            });
            peptideMap.sort(function(a, b) {
                return a.position.first - b.position.first;
            });
            var intermediate = new Date().getTime();

            console.log('Time to execute first part: ', (intermediate - dateStart));


            // A ---****---
            // B ----**----
            var isIncludedIn = function (pepA, pepB){
                return ((pepA.position.first <= pepB.position.first) && (pepA.position.second >= pepB.position.second))
            }


            for (var i=0; i<peptideMap.length; i++){
                for (var j=i+1; j<peptideMap.length; j++){


                    var pepA= peptideMap[i];
                    var pepB= peptideMap[j];

                    if (pepB.position.first > pepA.position.second) break;

                    if(isIncludedIn(pepA, pepB)){
                        pepA.include.push(pepB.name);
                        pepB.includedIn.push(pepA.name);
                    }else  if(isIncludedIn(pepB, pepA)){
                        pepB.include.push(pepA.name);
                        pepA.includedIn.push(pepB.name);
                    }

                }
            }
            var dateEnd = new Date().getTime();

            console.log('Time to execute all (before 300) : ', (dateEnd - dateStart));

            return peptideMap;
        },
        Sequence: function (isoforms, isoName) {
            var isoSeq = "";
            isoforms.forEach(function (o) {
                if (o.uniqueName === isoName) return isoSeq = o.sequence;
            });
            return isoSeq;
        },
        MatureProteins: function (matureProtein, isoName) {
            listMatProt = [];
            matureProtein.forEach(function (o) {
                if (o.targetingIsoformsMap[isoName]) {
                    var matProt = {
                        "isoform": o.targetingIsoformsMap[isoName].isoformName,
                        "start": o.targetingIsoformsMap[isoName].firstPosition,
                        "end": o.targetingIsoformsMap[isoName].lastPosition
                    };
                    listMatProt.push(matProt);
                }
            });
            return listMatProt;
        }
    };
    function nxIsoformChoice(isoforms) {
        if ($("#nx-isoformChoice").length > 0) {
            var datas = {
                "isoforms": (function () {
                    var listIsoforms = {
                        "visible": [],
                        "more": []
                    };
                    isoforms.sort(function (a, b) {
                        return parseInt(a.uniqueName.split("-")[1]) - parseInt(b.uniqueName.split("-")[1])
                    }).forEach(function (o, index) {
                        if (index <= 3) listIsoforms.visible.push(o);
                        else listIsoforms.more.push(o);
                    });
                    return listIsoforms;
                }())
            };
            var template = HBtemplates['templates/isoformChoice.tmpl'];
            var results = template(datas);
            $("#nx-isoformChoice").append(results);
            /////////// EventListener to change isoform
            getInfoForIsoform.Isoform();

            $("#nx-isoformChoice li:first-child").addClass("active");
        }
    }
    var RenderSequenceForIsoform = function (isoforms, isoName) {


        ////////////////////////// TEMPLATE SEQUENCE
        console.log("I m zorking fyn");
        if ($("#nx-overviewSeq").length > 0) {
            seq1 = new Sequence(getInfoForIsoform.Sequence(isoforms, isoName));
            seq1.render('#nx-overviewSeq', {
                'showLineNumbers': true,
                'wrapAminoAcids': true,
                'charsPerLine': 100
            });
            $("#sequenceHeader").append("<div class=\"pull-right\" style=\"margin-right:20px;font-style:italic;text-align: center;\"><span id=\"pepCover\" style=\"font-size:18px;color:#C50063;\"></span><br><span style=\"font-size:10px;font-weight:bold;\">Peptide coverage</span></div>");
            $("#sequenceHeader").append("<div class=\"pull-right\" style=\"margin-right:20px;font-style:italic;text-align: center;\"><span id=\"proteoCover\" style=\"font-size:18px;color:#69CC33;\"></span><br><span style=\"font-size:10px;font-weight:bold;\">Proteotypic coverage</span></div>");
            //$("#sequenceHeader").append("<div class=\"pull-right\" style=\"margin-right:20px;font-style:italic;text-align: center;\"><h5>Coverage</h5></div>");
            $("#sequenceHeader .badge").append(" aa");
        }
    };
    var addPeptidesInfos = function (selection, listPeptides, isoName) {
        if ($("#nx-detailedPeptide").length > 0) {
            var data = {
                "Peptides": (function () {
                    var found = [];
                    selection.filter(function (elem, pos, a) {
                        return a.indexOf(elem) == pos;
                    }).forEach(function (o) {
                        for (i = 0; i < listPeptides.length; i++) {
                            var founded = false;
                            if (listPeptides[i].name === o) {
                                for (item in found) {
                                    if (listPeptides[i].name === found[item].name) {
                                        founded = true;
                                        found[item].position.push(listPeptides[i].position);
                                        found[item].prePeptide.push(listPeptides[i].prePeptide);
                                        found[item].postPeptide.push(listPeptides[i].postPeptide);
                                        break;
                                    }
                                }
                                if (founded === false) {
                                    var pepTemp = jQuery.extend({}, listPeptides[i]);
                                    pepTemp.prePeptide = [pepTemp.prePeptide];
                                    pepTemp.postPeptide = [pepTemp.postPeptide];
                                    pepTemp.position = [pepTemp.position];
                                    found.push(pepTemp);
                                }
                            }
                        }
                    });
                    return found;
                }())
            };
            var listMatureProteins = getInfoForIsoform.MatureProteins(matureProtein, isoName);
            if (data.Peptides.length > 0) $("#nx-detailedPeptide").show("slow");
            else $("#nx-detailedPeptide").hide("slow");

            var template = HBtemplates['templates/detailedPeptide.tmpl'];
            $("#nx-detailedPeptide").html(template);

            var fillPeptideInfo = {
                fillNames: function () {
                    $("#nbPeptides").text(data.Peptides.length);
                    var listOfNames = "";
                    for (i = 0; i < data.Peptides.length; i++) {
                        listOfNames += "<li><a class=\"name\" style=\"color:lightsteelblue;cursor:pointer;\">" + data.Peptides[i].name + "</a></li>";
                    }
                    $('#listNames').html(listOfNames);
                },
                peptideSelected: function () {
                    $(".name").click(function () {
                        var name = $(this).text();
                        $(".nameActive").removeClass("nameActive");
                        $(this).addClass("nameActive");
                        fillPeptideInfo.fillDescription(name);
                    })
                },
                fillDescription: function (peptide) {
                    $("#peptidePositions").html("");
                    $('#properties').html("");
                    $('#nature').html("");
                    $('#tissueSpec').html("");
                    $("#pepIncluded").html("");
                    $('#pepIncludedIn').html("");
                    $('#isoProteo').html("");
                    $("#pepSources").html("");
                    $('#ptmInfos').html("");
                    for (i = 0; i < data.Peptides.length; i++) {
                        if (data.Peptides[i].name === peptide) {
                            peptide = data.Peptides[i];
                            break;
                        }
                    }
                    $('#titlePepName').text(peptide.name);
                    peptide.position.forEach(function (o, i) {
                        var semiTrypticEnd = "-";
                        if (peptide.sequence[peptide.sequence.length - 1] === "K" || peptide.sequence[peptide.sequence.length - 1] === "R") semiTrypticEnd = "Tryp";
                        else if (peptide.postPeptide[i] === undefined) semiTrypticEnd = "Term";
                        var semiTrypticStart = "-";
                        if (peptide.prePeptide[i] === "K" || peptide.prePeptide[i] === "R") semiTrypticStart = "Tryp";
                        else if (peptide.prePeptide[i] === undefined) semiTrypticEnd = "Term";
                        var trypticity = semiTrypticStart !== "-" && semiTrypticEnd !== "-" ? "Tryptic" : semiTrypticStart === "-" && semiTrypticEnd === "-" ? "Non-Tryptic" : "semi-Tryptic";
                        var miscleavage = "-";
                        if (trypticity !== "Non-Tryptic") {
                            miscleavage = 0;
                            for (i = 0; i < peptide.sequence.length - 1; i++) {
                                if (peptide.sequence[i] === "K" || peptide.sequence[i] === "R") {
                                    miscleavage += 1;
                                }
                            }
                        }
                        var Nterm = "-";
                        var Cterm = "-";
                        listMatureProteins.forEach(function (p) {
                            if (p.start === o.first) Nterm = "N-term";
                            if (p.end === o.second) Cterm = "C-term";
                        });
                        $("#peptidePositions").append("<tr><td>" + o.first + "</td><td>" + o.second + "</td>" +
                        "<td>" + semiTrypticStart + "</td><td>" + semiTrypticEnd + "</td><td style=\"text-align: center;\">" + miscleavage + "</td><td>" + trypticity + "</td>" +
                        "<td>" + Nterm + "</td><td>" + Cterm + "</td></tr>");
                    });

                    $('#first').text(peptide.position);
                    $('#length').text(peptide.length);

                    if (peptide.properties.natural === true) {
                        $('#nature').append("<li>natural</li>")
                    }
                    if (peptide.properties.synthetic === true) {
                        $('#nature').append("<li>synthetic</li>")
                    }
                    if (peptide.properties.proteotypic === false) {
                        var entryMatchListHTML = "<dl><dt>Entry match list</dt><dd><ul style=\"padding-left:20px;\">";
                        var query = "select distinct ?entry ?gene where { "+
                            "?entry :isoform ?iso . "+
                            "?entry :gene / :name ?gene ."+
                            "?iso :peptideMapping / :peptideName \"" + peptide.name + "\"^^xsd:string . "+
                            "}";

                        nx.executeSparql(query).then(function (data) {
                            console.log(data);
                            var entryMatch = [];
                            data.results.bindings.forEach(function (o) {
                                var infos = {
                                    "entryID": o.entry.value.toString().match(/[^\/]*$/)[0],
                                    "url": "",
                                    "geneName": o.gene.value
                                };
                                infos.url = "/?nxentry=" + infos.entryID;
                                entryMatch.push(infos);
                            });
                            entryMatch.forEach(function (o) {
                                entryMatchListHTML += "<li><a href=\"" + o.url + "\">" + o.entryID + "</a>" + "<span style=\"font-style: italic; margin-left:5px;\"> ( Gene Name : " + o.geneName + " )</span></li>";
                            });
                            entryMatchListHTML += "</ul></dd></dl>";
                            $('#proteomeProperties').html(entryMatchListHTML);
                        }, function (error) {
                            console.log(error.responseText);
                        });
                    }
                    else {
                        $('#proteomeProperties').html("<dl> <dt>Proteotypicity</dt> <dd> <ul style=\"padding-left:20px;\"><li>Yes</li></ul> </dd> </dl>" +
                        "<dl> <dt>Isoform Proteotypicity</dt><dd><ul style=\"padding-left:20px;\"><li>" + peptide.isoformProteotypicity + "</li></ul></dd></dl>");
                    }
                    $('#pepSeq').text(peptide.sequence);
                    if (peptide.include.length === 0) $('#pepIncluded').append("<p><em>None</em></p>");
                    else {
                        peptide.include.forEach(function (o) {
                            $('#pepIncluded').append("<li>" + o + "</li>")
                        });
                    }
                    if (peptide.includedIn.length === 0) $('#pepIncludedIn').append("<p><em>None</em></p>");
                    else {
                        peptide.includedIn.forEach(function (o) {
                            $('#pepIncludedIn').append("<li>" + o + "</li>")
                        });
                    }
                    var pmidFound = false;
                    peptide.sources.forEach( function (o) {
                        $("#pepSources").append("<li>" + o + "</li>");
                    });
                    peptide.tissueSpecificity.forEach(function (o) {
                        if (o.match("PMID")) {
                            pmidFound=true;
                        }
                        $('#tissueSpec').append("<li>" + o + "</li>")
                    });
                    if (pmidFound === true) {
                        var query = "SELECT ?iso ?ptmref ?ptmpub ?ptmpubid ?mappubid ?ptmtype ?ptmstart ?ptmend ?ptmterm ?ptmlabel ?ptmcomment WHERE {" +
                            "values (?pepName ?iso) {(\"" + peptide.name + "\"^^xsd:string isoform:" + isoName + ") }" +
                            "?iso :ptm ?ptm ." +
                            "?ptm rdf:type ?ptmtype ." +
                            "optional { ?ptm :start ?ptmstart } ." +
                            "optional { ?ptm :end ?ptmend } ." +
                            "optional { ?ptm :term ?ptmterm ." +
                            "?ptmterm rdfs:label ?ptmlabel } ." +
                            "optional { ?ptm rdfs:comment ?ptmcomment } ." +
                            "?ptm :evidence ?ptmevi ." +
                            "?ptmevi :reference ?ptmref ." +
                            "?ptmref :from ?ptmpub." +
                            "bind (substr(str(?ptmpub),8) as ?ptmpubid)" +
                            "filter (contains(?ptmpub, \"PubMed\"))" +
                            "?iso :peptideMapping ?map ." +
                            "?map :peptideName ?pepName ." +
                            "?map :evidence ?mapevi ." +
                            "?mapevi :assignedBy ?mapsrc ." +
                            "bind (substr(str(?mapsrc),37,8) as ?mappubid)" +
                            "filter (contains(str(?mapsrc), \"PMID\"))" +
                            "filter (?ptmtype  in (:CrossLink , :ModifiedResidue , :GlycosylationSite)) ." +
                            "filter (str(?ptmpubid) = str(?mappubid))" +
                            "}";

                        nx.executeSparql(query).then(function (data) {
                            if (data.results.bindings.length > 0) {
                                data.results.bindings.forEach(function (o) {
                                    $('#ptmInfos').append("<div class=\"row\"style=\"border-bottom:1px solid #E7EAEC;\"><dl class=\"col-md-6\"><dt>PTM ID</dt><dd>" + o.ptmterm.value.toString().match(/[^\/]*$/)[0] + "</dd></dl>" +
                                    "<dl class=\"col-md-6\"><dt>Position</dt><dd>" + o.ptmstart.value + "</dd></dl>" +
                                    "<dl class=\"col-md-6\"><dt>Type</dt><dd>" + o.ptmtype.value.toString().match(/[^#]*$/)[0].slice() + "</dd></dl>" +
                                    "<dl class=\"col-md-6\"><dt>Description</dt><dd>" + o.ptmcomment.value + "</dd></dl></div>");
                                });
                            }
                            else $('#ptmInfos').html("No PTM found");
                        }, function (error) {
                            console.log(error.responseText);
                        });
                    }
                    else {
                        $('#ptmInfos').html("No PTM found");
                    }


                    if ($('#peptideSpecificity').hasVerticalScrollBar()) {
                        $('#peptideSpecificity').removeClass("ignoreShift");
                    }
                    else $('#peptideSpecificity').addClass("ignoreShift");

                    $("#pepPosTable").stupidtable();
                    $(function () {
                        $("#sortStart").stupidsort("asc");
                    });
                }
            };
            fillPeptideInfo.fillNames();
            $(".name:first").addClass("nameActive");
            fillPeptideInfo.fillDescription($(".name:first").text());
            fillPeptideInfo.peptideSelected();
        }
    };
    var RenderPeptidesForIsoform = function (peptideMappings, isoName)  {

        ////////////////////////// TEMPLATE PEPTIDES

        if ($("#nx-overviewPeptide").length > 0) {
            var datas = {
                "PeptideLength": 0,
                "Peptides": getInfoForIsoform.Peptides(peptideMappings, isoName)
            };
            datas.PeptideLength = datas.Peptides.length;

            var template = HBtemplates['templates/peptideTable.tmpl'];
            var results = template(datas);
            $("#nx-overviewPeptide").html(results);
            var defaultSeq = $("#fastaSeq").html();
            var coveredSeq = $("#fastaSeq").html();

            $(function () {
                $("#pepTableSorted").stupidtable({
                    "positions": function (a, b) {

                        var aNum = a.split("-")[0];
                        var bNum = b.split("-")[0];

                        return parseInt(aNum, 10) - parseInt(bNum, 10);
                    }
                });
                //$("#pepTableSorted th:nth-child(4)").stupidsort("asc");
                //$("#pepTableSorted th:nth-child(3)").stupidsort("asc");
            });

            var HL = {
                "HashAA": [],
                "HashAA2": [],
                clickPos: function () {
                    $(".pepPos").click(HL.findPeptide);
                    $(".PepSelected").click(HL.moreInfos);
                    $(document).click(HL.stopHL);
                },
                findPeptide: function (event) {
                    //var templateLoader = HBtemplates['templates/preLoader.tmpl'];
                    //$("#peptideTableTitle").append(templateLoader);
                    console.log("does it zorkk ???");
                    event.stopPropagation();
                    var positions = $(this).text();
                    HL.highlighting(positions);
                },
                highlighting: function (positions) {
                    var dateHL = new Date().getTime();
                    positions = positions.split("-").map(function (o) {
                        return parseInt(o)
                    });
                    seq1.coverage(HL.HashAA, positions[0]-1, positions[1]-1);
                    var ElementTop = $('#peptideHighlighted').position().top - 140;
                    var scrollPosition = $("#scroller").scrollTop();
                    var scrollingLength = ElementTop + scrollPosition;
                    $("#scroller").animate({scrollTop: scrollingLength}, 1000);
                    $(function() {
                        $("#preLoaderActive").remove();
                    });
                    var dateHLend = new Date().getTime();

                    console.log('Time to execute highlighting part (60 before): ', (dateHLend - dateHL));
                },
                //if clicking anywhere in the document
                stopHL: function () {
                    $("#fastaSeq").html(coveredSeq);
                },
                firstCoverage: function () {
                    var dateFC = new Date().getTime();

                    HL.HashAA = HL.applyAAFormating(datas.Peptides);
                    seq1.coverage(HL.HashAA);
                    var legend = [{name:"non-proteotypic", color:"#4A57D4", underscore:false}, {name:"single proteotypic", color:"#007800", underscore:false},{name:"several proteotypic", color:"#69CC33", underscore:false},{name:"synthetic", color:"#fff", underscore:true}];
                    seq1.addLegend(legend);
                    coveredSeq = $("#fastaSeq").html();

                    var dateFCend = new Date().getTime();

                    console.log('Time to execute first coverage part (30 before): ', (dateFCend - dateFC));
                },
                applyAAFormating: function(list) {
                    var datestart = new Date().getTime();
                    var HashAA = [];
                    var proteoCoverage=0;
                    var pepCoverage=0;
                    var jMin=0;
                    var begin = 1;
                    var subseqColor = "";
                    var subseq_;
                    var seqLength = getInfoForIsoform.Sequence(isoforms, isoName).length;
                    for (var i=1;i<seqLength+1;i++) {
                        var naturalPep = 0;
                        var syntheticPep = 0;
                        var proteotypicPep = 0;
                        var checkScale = false;
                        for (var j=jMin;j<list.length;j++) {
                            if (i >= list[j].position.first && i <= list[j].position.second) {
                                if (list[j].properties.natural) naturalPep += 1;
                                if (list[j].properties.synthetic) syntheticPep += 1;
                                if (list[j].properties.proteotypic) proteotypicPep += 1;
                            }
                            if (i > list[j].position.second && checkScale === false) {
                                checkScale=true;
                                jMin=j;
                            }
                            if (list[j].position.first > i) break;
                        }
                        var clr = "black";
                        var underscore = false;
                        if (syntheticPep > 0) underscore = true;
                        else if (naturalPep > 0 || proteotypicPep > 0) pepCoverage += 1;
                        if (naturalPep > 0) clr = "#4A57D4";
                        if (proteotypicPep > 0) {
                            if (syntheticPep === 0) proteoCoverage += 1;
                            if (proteotypicPep === 1) clr = "#007800";
                            else clr = "#00C500";
                        }
                        if (i === 1) {
                            subseqColor = clr;
                            subseq_=underscore;
                        }
                        if (!(clr === subseqColor && underscore === subseq_)) {
                            HashAA.push({"start": begin-1, "end": i-1, "color": subseqColor, "underscore": subseq_});
                            begin=i;
                            subseqColor = clr;
                            subseq_=underscore;
                        }
                        if (i === seqLength) {
                            HashAA.push({"start": begin-1, "end": i, "color": subseqColor, "underscore": subseq_});
                        }

                    }
                    var intermediate = new Date().getTime();

                    console.log('Time to execute AAproperties part (1600 before): ', (intermediate - datestart));
                    proteoCoverage = ((proteoCoverage/seqLength)*100).toFixed(2);
                    pepCoverage = ((pepCoverage/seqLength)*100).toFixed(2);
                    $("#proteoCover").text(proteoCoverage + "%");
                    $("#pepCover").text(pepCoverage + "%");

                    return HashAA;
                },
                moreInfos: function (event) {
                    var selection = [];
                    $(".PepSelected").each(function (o) {
                        if ($(this).prop("checked")) {
                            selection.push($(this).parent().next().text());
                        }
                    });
                    addPeptidesInfos(selection, datas.Peptides, isoName);

                }
            };
            var datestart = new Date().getTime();
            pepHistogram(datas.Peptides);
            var intermediate = new Date().getTime();

            console.log('Time to execute histogram part (1600 before): ', (intermediate - datestart));


            $(function () {
                HL.firstCoverage();
                HL.clickPos();
            });
        }
    };

    $(function () {
        [nx.getProteinSequence(), nx.getPeptide(), nx.getSrmPeptide(), nx.getMatureProtein(), nx.getSecondaryStructure()].reduce(function (sequence, dataPromise) {
            return sequence.then(function () {
                return dataPromise;
            }).then(function (oneData) {
                cpt += 1;
                switch (cpt) {
                    case 1:
                        isoforms = oneData;
                        RenderSequenceForIsoform(isoforms, nxEntryName + "-1");
                        nxIsoformChoice(isoforms);
                        break;
                    case 2:
                        peptideMappings = oneData;
                        break;
                    case 3:
                        srmPeptideMappings = oneData;
                        srmPeptideMappings.forEach(function (o) {
                            var alreadySaved = false;
                            for (var i = 0; i<peptideMappings.length;i++) {
                                if (o.peptideUniqueName === peptideMappings[i].peptideUniqueName) {
                                    alreadySaved = true;
                                    break;
                                }
                            }
                            if (alreadySaved === false) {
                                peptideMappings.push(o);
                            }
                        });
                        break;
                    case 4:
                        matureProtein = oneData;

                        RenderPeptidesForIsoform(peptideMappings, nxEntryName + "-1");
                    case 5:
                        annotations = oneData;
                        //nxPviz(annotations, isoforms);
                        break;
                }
            });
        }, Promise.resolve())
            .then(function () {
                console.log("All done");
            })
            .catch(function (err) {
                // catch any error that happened along the way
                console.log("Argh, broken: " + err.message);
            })
    });

}
// Shorthand for $( document ).ready()
$(function () {
    initNXDivs();
});

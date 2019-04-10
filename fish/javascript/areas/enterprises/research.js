var research = {
    initialize() {
        this.theory_difference = 0;
        this.theories_per_second = 0;
        this.multiplier = 1;

        vendor.add_item(enterprises.research_vendor, {
            data: {
                parent: "research_content",
                id: "sales_upgrade_2",
                classes: ["enterprise_investment absolute"],
                header: {
                    bold: "Future Market Analysis",
                    regular: "(§500)"
                },
                text: "Studying current and past market trends will allow us to accurately predict future trends, increasing the efficiency of our marketing.",
                on_click: function() {
                    research.animate($(this), function() {
                        workers.efficiency.sales -= 12;
                        workers.efficiency.transit += 7;
                    });

                    research.update_theories(-500);
                },
                disabled: function() {
                    return resources.research_theories.count < 500;
                }
            }
        });
        vendor.add_item(enterprises.research_vendor, {
            data: {
                parent: "research_content",
                id: "workers_upgrade_2",
                classes: ["enterprise_investment absolute"],
                header: {
                    bold: "Cognitive Dissonance",
                    regular: "(§1,000)"
                },
                text: "Introduce new company propaganda to your workers via mandatory re-training videos, resulting in a conflict of beliefs allowing you to work them harder.",
                on_click: function() {
                    research.animate($(this), function() {
                        workers.efficiency.workers -= 12;
                        workers.efficiency.marketing += 7;
                    });

                    research.update_theories(-1000);
                },
                disabled: function() {
                    return resources.research_theories.count < 1000;
                }
            }
        });
        vendor.add_item(enterprises.research_vendor, {
            data: {
                parent: "research_content",
                id: "ocean_life_upgrade_1",
                classes: ["enterprise_investment absolute"],
                header: {
                    bold: "Salinity Balancing",
                    regular: "(§1,500)"
                },
                text: "Introduces new methods for balancing the rising salinity in the oceans, allowing life to replenish faster.",
                on_click: function() {
                    research.animate($(this), function() {
                        workers.decay_multiplier -= 0.5;
                    });

                    research.update_theories(-1500);
                },
                disabled: function() {
                    return resources.research_theories.count < 1500;
                }
            }
        });
        vendor.add_item(enterprises.research_vendor, {
            data: {
                parent: "research_content",
                id: "research_point_upgrade_2",
                classes: ["enterprise_investment"],
                header: {
                    bold: "Open Source Research",
                    regular: "(§2,000)"
                },
                text: "Opening up parts of our research to the public gives us a considerable boost to possible solutions via public contributions.",
                on_click: function() {
                    research.animate($(this), function() {
                        research.theories_per_second += 3;
                    });

                    research.update_theories(-2000);
                },
                disabled: function() {
                    return resources.research_theories.count < 2000;
                }
            }
        });
        vendor.add_item(enterprises.research_vendor, {
            data: {
                parent: "research_content",
                id: "transit_upgrade_2",
                classes: ["enterprise_investment absolute"],
                header: {
                    bold: "Reusable Bio-fuel",
                    regular: "(§2,500)"
                },
                text: "Advances in plant based fuels allow you to switch over from oil, lowering prices and increasing fuel efficiency.",
                on_click: function() {
                    research.animate($(this), function() {
                        workers.efficiency.transit -= 12;
                        workers.efficiency.sales += 7;
                    });

                    research.update_theories(-2500);
                },
                disabled: function() {
                    return resources.research_theories.count < 2500;
                }
            }
        });
        vendor.add_item(enterprises.research_vendor, {
            data: {
                parent: "research_content",
                id: "marketing_upgrade_2",
                classes: ["enterprise_investment absolute"],
                header: {
                    bold: "Celebrity Influence",
                    regular: "(§3,000)"
                },
                text: "Analyzes common beliefs and morals held by celebrities so we can target them with propaganda campaigns to bring in their audiences.",
                on_click: function() {
                    research.animate($(this), function() {
                        workers.efficiency.marketing -= 12;
                        workers.efficiency.workers += 7;
                    });

                    research.update_theories(-3000);
                },
                disabled: function() {
                    return resources.research_theories.count < 3000;
                }
            }
        });
        vendor.add_item(enterprises.research_vendor, {
            data: {
                parent: "research_content",
                id: "marketing_upgrade_2",
                classes: ["enterprise_investment absolute"],
                header: {
                    bold: "Gene Splicing",
                    regular: "(§3,500)"
                },
                text: "The modification of genes allows you to create custom fish by adding or removing specific parts of existing aquatic life.",
                on_click: function() {
                    research.animate($(this), function() {
                        $("#designer_section")
                            .fadeIn();
                        enterprises.desk_data.designer = true;
                    });

                    research.update_theories(-3500);
                },
                disabled: function() {
                    return resources.research_theories.count < 3500;
                }
            }
        });
        vendor.add_item(enterprises.research_vendor, {
            data: {
                parent: "research_content",
                id: "workers_increase_4",
                classes: ["enterprise_investment absolute"],
                header: {
                    bold: "Subliminal Hypnosis",
                    regular: "(§4,000)"
                },
                text: "Begin utilizing hypnosis techniques within our company propaganda and training videos, allowing us to bring in significantly more workers.",
                on_click: function() {
                    research.animate($(this), function() {
                        resources.workers.count += 25000;
                    });

                    research.update_theories(-4000);
                },
                disabled: function() {
                    return resources.research_theories.count < 4000;
                }
            }
        });
        vendor.add_item(enterprises.research_vendor, {
            data: {
                parent: "research_content",
                id: "research_speed_upgrade_2",
                classes: ["enterprise_investment"],
                header: {
                    bold: "Artificial Prediction",
                    regular: "(§4,500)"
                },
                text: "Usage of AI allows us to rapidly cycle through low probability theories meaning our scientists can focus on higher probability theories thus vastly increasing our research speed.",
                on_click: function() {
                    research.animate($(this), function() {
                        research.multiplier += 0.64;
                    });

                    research.update_theories(-4500);
                },
                disabled: function() {
                    return resources.research_theories.count < 4500;
                }
            }
        });
        vendor.add_item(enterprises.research_vendor, {
            data: {
                parent: "research_content",
                id: "stock_upgrade_2",
                classes: ["enterprise_investment absolute"],
                header: {
                    bold: "Market Coercion",
                    regular: "(§5,000)"
                },
                text: "Use the companies influence to coerce other sectors into supporting stocks of interest by threating to stop your sale of goods in their markets.",
                on_click: function() {
                    research.animate($(this), function() {
                        stocks.expected_return += 0.15;
                    });

                    research.update_theories(-5000);
                },
                disabled: function() {
                    return resources.research_theories.count < 5000;
                }
            }
        });
        vendor.add_item(enterprises.research_vendor, {
            data: {
                parent: "research_content",
                id: "designer_upgrade_1",
                classes: ["enterprise_investment absolute"],
                header: {
                    bold: "Gene Pool Expansion",
                    regular: "(§5,500)"
                },
                text: "Introduces experimental species that were previously non-receptive allowing you to splice new gene sequences, furthering your available gene pool.",
                on_click: function() {
                    research.animate($(this), function() {
                        designer.part_pack_1 = true;
                    });

                    research.update_theories(-5500);
                },
                disabled: function() {
                    return resources.research_theories.count < 5500;
                }
            }
        });
        vendor.add_item(enterprises.research_vendor, {
            data: {
                parent: "research_content",
                id: "ocean_upgrade_2",
                classes: ["enterprise_investment absolute"],
                header: {
                    bold: "Pollution Cleansing",
                    regular: "(§6,000)"
                },
                text: "Discoveries around plastic and rubber disintegration emerge, allowing you to shear away the majority of the pollution in oceans thereby increase aquatic life fertility.",
                on_click: function() {
                    research.animate($(this), function() {
                        workers.decay_multiplier -= 0.5;
                    });

                    research.update_theories(-6000);
                },
                disabled: function() {
                    return resources.research_theories.count < 6000;
                }
            }
        });
        vendor.add_item(enterprises.research_vendor, {
            data: {
                parent: "research_content",
                id: "designer_upgrade_2",
                classes: ["enterprise_investment absolute"],
                header: {
                    bold: "Automated Splicing",
                    regular: "(§6,500)"
                },
                text: "Automation of gene editing allows you to use new genomes from species that were too complex for humans to efficiently splice.",
                on_click: function() {
                    research.animate($(this), function() {
                        designer.part_pack_2 = true;
                    });

                    research.update_theories(-6500);
                },
                disabled: function() {
                    return resources.research_theories.count < 6500;
                }
            }
        });

        enterprises.research_interval = window.setInterval(research.update, 5000);
    },

    update() {
        research.update_theories(research.theories_per_second * 5);
    },

    update_theories(amount) {
        resources.research_theories.count += amount;
        research.theory_difference += amount;

        let difference = research.theory_difference;
        $("#research_theory_difference")
            .text(" (" + (difference >= 0 ? "+" : "-") + main.stringify(Math.abs(difference)) + ")")
            .stop()
            .show()
            .css("opacity", 1.0)
            .fadeOut(1200, function() {
                research.theory_difference = 0;
            });

        if (enterprises.current_view == "desk") {
            $("#research_theories_count")
                .text(main.stringify(resources.research_theories.count));
        }

        for (let button of enterprises.research_vendor.shown) {
            let parent = $("#" + button.data.id + "_button");
            if ($(parent).prop("purchased") != true) {
                $(parent)
                    .prop("disabled", button.data.disabled());
            }
        }
    },

    update_display() {
        for (let element of $(".progress")) {
            let id = "#" + $(element).attr("parent") + "_button";
            let parent = $(id);

            $(element)
                .css("top", $(parent).position().top + 6);

            if (vendor.registered_item(enterprises.research_vendor, id)) {
                console.log("registered: " + id);
            }
        }

        desk.check_empty();
    },

    animate(parent, callback) {
        $(parent)
            .css("background-color", "transparent")
            .prop("purchased", true)
            .prop("disabled", true);

        let id = $(parent).attr("id").replace("_button", "");
        let element = $("<div>")
            .attr("parent", id)
            .attr("timer", 3)
            .addClass("progress absolute")
            .css("top", $(parent).position().top + 6)
            .css("left", $(parent).position().left + 6)
            .appendTo($(parent));
        $(element)
            .animate(
                { "width": "295px" },
                $(element).attr("timer") * 1000,
                "linear",
                function() {
                    vendor.remove_item(enterprises.research_vendor, id, research.update_display);
                    
                    if (callback != null) {
                        callback();
                    }
                }
            );
    }
}
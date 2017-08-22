/*
 * File Name：PortalController.java
 *
 * Copyrighe：copyright@2017 GZSW Company. All Rights Reserved
 *
 * Create Time: 2017年6月23日 上午11:17:18
 */
package com.gdws.vehicle.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author lcc (nplcclin@gmail.com)
 * @version 1.0, 2017年6月23日 上午11:17:18
 */
@Controller
public class PortalController {
    @RequestMapping("index")
    String frequentBusines() {
        return "index";
    }

    @RequestMapping("index-bayonet")
    String indexBayonet() {
    	return "index-bayonet";
    }
    @RequestMapping("index-car")
    String indexCar() {
    	return "index-car";
    }
    @RequestMapping("behavior-analysis")
    String behaviorAnalysis() {
        return "behavior-analysis";
    }
    
    @RequestMapping("behavior-prediction")
    String behaviorPrediction() {
        return "index-bayonet";
    }
    @RequestMapping("first-analysis")
    String firstAnalysis() {
        return "first-analysis";
    }
    @RequestMapping("frequency-analysis")
    String frequencyAnalysis() {
        return "frequency-analysis";
    }
    @RequestMapping("deck-analysis")
    String deckAnalysis() {
        return "deck-analysis";
    }
    @RequestMapping("daynight-analysis")
    String daynightAnalysis() {
        return "daynight-analysis";
    }
    @RequestMapping("trajectory-analysis")
    String trajectoryAnalysis() {
        return "trajectory-analysis";
    }
    @RequestMapping("od-analysis")
    String odAnalysis() {
        return "od-analysis";
    }
    @RequestMapping("all-query")
    String allQuery() {
        return "all-query";
    }
    @RequestMapping("outer-limit-economics")
    String outerLimitEconomics(){
    	return "outer-limit-economics";
    }
    @RequestMapping("outer-limit-sociology")
    String outerLimitSociology(){
    	return "outer-limit-sociology";
    }
    @RequestMapping("outer-limit-monitoring")
    String outerLimitMonitoring(){
    	return "outer-limit-monitoring";
    }
    @RequestMapping("outer-limit-environmental")
    String outerLimitEnvironmental(){
    	return "outer-limit-environmental";
    }
    @RequestMapping("outer-limit-law")
    String outerLimitlaw(){
    	return "outer-limit-law";
    }
    @RequestMapping("outer-limit-dynamic")
    String outerLimitDynamic(){
    	return "outer-limit-dynamic";
    }
    @RequestMapping("outer-limit-law-mission")
    String outerLimitLawMission(){
    	return "outer-limit-law-mission";
    }
    @RequestMapping("intelligence-analysis")
    String intelligenceAnalysis(){
    	return "intelligence-analysis";
    }
    @RequestMapping("intelligence-analysis-economics")
    String intelligenceAnalysisEconomics(){
    	return "intelligence-analysis-economics";
    }
    @RequestMapping("intelligence-analysis-environmental ")
    String intelligenceAnalysisEnvironmental(){
    	return "intelligence-analysis-environmental";
    }
    @RequestMapping("intelligence-analysis-feelings ")
    String intelligenceAnalysisFeelings(){
    	return "intelligence-analysis-feelings";
    }
    @RequestMapping("intelligence-analysis-traffic ")
    String intelligenceAnalysisTraffic(){
    	return "intelligence-analysis-traffic";
    }
    
    @RequestMapping("limit-fullpage")
    String limitFullpage(){
    	return "limit-fullpage";
    }
    @RequestMapping("implementation-management")
    String implementationManagement(){
    	return "implementation-management";
    }   
}


ShallowFoundationGen $FoundationTag $ConnectNode $InputFileName $FootingCondition
algorithm BFGS
algorithm Broyden <$count>
algorithm KrylovNewton <-iterate $tangIter> <-increment $tangIncr> <-maxDim $maxDim>
algorithm NewtonLineSearch  <-type $typeSearch> <-tol $tol> <-maxIter $maxIter> <-minEta $minEta> <-maxEta $maxEta>
algorithm algorithmType? arg1? ...
analysis analysisType?
analyze $numIncr <$dt> <$dtMin $dtMax $Jd>
command arg1 arg2 arg3 ...
constraints Lagrange <$alphaS $alphaM >
constraints Penalty $alphaS $alphaM
constraints Plain
constraints Transformation
constraints constraintType? arg1? ...
database $type $dbName
element  ElasticTubularJoint  $Tag  $iNode  $jNode  $Brace_Diameter  $Brace_Angle  $E  $Chord_Diameter  $Chord_Thickness  $Chord_Angle
element BeamContact3D $eleTag $iNode $jNode $sNode $lNode $radius $crdTransf $matTag $gTol $fTol <$cFlag$>
element CoupledZeroLength $eleTag $iNode $jNode  $dirn1 $dirn2 $matTag <$rFlag>
element Joint2D $eleTag $Nd1 $Nd2 $Nd3 $Nd4 $NdC <$Mat1 $Mat2 $Mat3 $Mat4> $MatC $LrgDspTag
element KikuchiBearing $eleTag $iNode $jNode -shape $shape -size $size $totalRubber <-totalHeight $totalHeight> -nMSS $nMSS -matMSS $matMSSTag <-limDisp $limDisp> -nMNS $nMNS -matMNS $matMNSTag <-lambda $lambda> <-orient <$x1 $x2 $x3> $yp1 $yp2 $yp3> <-mass $m> <-noPDInput> <-noTilt> <-adjustPDOutput $ci $cj> <-doBalance $limFo $limFi $nIter>
element SSPbrick $eleTag $iNode $jNode $kNode $lNode $mNode $nNode $pNode $qNode $matTag <$b1 $b2 $b3>
element SSPquad $eleTag $iNode $jNode $kNode $lNode $matTag $type $thick <$b1 $b2>
element SSPquadUP $eleTag $iNode $jNode $kNode $lNode $matTag $thick $fBulk $fDen $k1 $k2 $void $alpha <$b1 $b2>
element ShellMITC4 $eleTag $iNode $jNode $kNode $lNode $secTag
element ShellNL $eleTag $node1 $node2 ... $node9 $secTag
element SurfaceLoad $eleTag $iNode $jNode $kNode $lNode $p
element TFP $eleTag $iNode $jNode $R1 $R2 $R3 $R4 $D1 $D2 $D3 $D4 $d1 $d2 $d3 $d4 $mu1 $mu2 $mu3 $mu4 $h1 $h2 $h3 $h4 $H0 $colLoad <$K>
element TripleFrictionPendulum $eleTag $iNode $jNode $L1 $L2 $L3 $d1 $d2 $d3 $mu1slow $mu1fast $n1slow $n1fast $alpha10 $alpha11 $alpha12 $mu2slow $mu2fast $n2slow $n2fast $alpha20 $alpha21 $alpha22 $mu3slow $mu3fast $n3slow $n3fast $alpha30 $alpha31 $alpha32 $W $uy $kvc $kvt $minFv $maxMuFac $tol
element bbarBrick $eleTag $node1 $node2 $node3 $node4 $node5 $node6 $node7 $node8 $matTag <$b1 $b2 $b3>
element bbarQuad $eleTag $iNode $jNode $kNode $lNode $matTag
element beamColumnJoint $eleTag $Nd1 $Nd2 $Nd3 $Nd4 $Mat1 $Mat2 $Mat3 $Mat4 $Mat5 $Mat6 $Mat7 $Mat8 $Mat9 $Mat10 $Mat11 $Mat12 $Mat13 <$eleHeightFac $eleWidthFac>
element corotTruss $eleTag $iNode $jNode $A $matTag <-rho $rho>
element dispBeamColumn $eleTag $iNode $jNode $numIntgrPts $secTag $transfTag <-mass $massDens>  <-integration $intType>
element dispBeamColumnInt $eleTag $iNode $jNode $numIntgrPts $secTag $transfTag $cRot <-mass $massDens>
element elasticBeamColumn $eleTag $iNode $jNode $A $E $Iz $transfTag <-mass $massDens>
element elastomericBearing $eleTag $iNode $jNode $kInit $fy $alpha -P $matTag -Mz $matTag <-orient $x1 $x2 $x3 $y1 $y2 $y3> <-shearDist $sDratio> <-doRayleigh> <-mass $m>
element eleType? arg1? ...
element enhancedQuad $eleTag $iNode $jNode $kNode $lNode type $matTag
element flatSliderBearing $eleTag $iNode $jNode $frnMdlTag $kInit -P $matTag -Mz $matTag <-orient $x1 $x2 $x3 $y1 $y2 $y3> <-shearDist $sDratio> <-doRayleigh> <-mass $m> <-iter $maxIter $tol>
element forceBeamColumn $eleTag $iNode $jNode $transfTag "HingeRadau $secTagI $LpI $secTagJ $LpJ $secTagInterior" <-mass $massDens> <-iter $maxIters $tol>
element forceBeamColumn $eleTag $iNode $jNode $transfTag "IntegrationType arg1 arg2 ..." <-mass $massDens> <-iter $maxIters $tol>
element multipleShearSpring $eleTag $iNode $jNode $nSpring -mat $matTag <-lim $dsp> <-orient <$x1 $x2 $x3> $yp1 $yp2 $yp3> <-mass $m>
element quad $eleTag $iNode $jNode $kNode $lNode $thick $type $matTag <$pressure $rho $b1 $b2>
element singleFPBearing $eleTag $iNode $jNode $frnMdlTag $Reff $kInit -P $matTag -Mz $matTag <-orient $x1 $x2 $x3 $y1 $y2 $y3> <-shearDist $sDratio> <-doRayleigh> <-mass $m> <-iter $maxIter $tol>
element stdBrick $eleTag $node1 $node2 $node3 $node4 $node5 $node6 $node7 $node8 $matTag <$b1 $b2 $b3>
element tri31 $eleTag $iNode $jNode $kNode $thick $type $matTag <$pressure $rho $b1 $b2>
element truss $eleTag $iNode $jNode $A $matTag <-rho $rho> <-doRayleigh $rFlag>
element twoNodeLink $eleTag $iNode $jNode -mat $matTags -dir $dirs <-orient <$x1 $x2 $x3> $y1 $y2 $y3> <-pDelta (4 $Mratio)> <-shearDist (2 $sDratios)> <-doRayleigh> <-mass $m>
element zeroLengtContactNTS2Dh $eleTag -sNdNum $sNdNum -mNdNum $mNdNum -Nodes $Nodes $Kn $kt $phi
element zeroLength $eleTag $iNode $jNode -mat $matTag1 $matTag2 ... -dir $dir1 $dir2 ...<-doRayleigh $rFlag> <-orient $x1 $x2 $x3 $yp1 $yp2 $yp3>
element zeroLengthContact2D $eleTag $sNode $mNode $Kn $Kt $mu -normal $Nx $Ny
element zeroLengthImpact3D $tag $slaveNode $masterNode $direction $initGap $frictionRatio $Kt $Kn $Kn2 $Delta_y $cohesion
element zeroLengthND $eleTag $iNode $jNode $matTag <$uniTag> <-orient $x1 $x2 $x3 $yp1 $yp2 $yp3>
element zeroLengthSection $eleTag $iNode $jNode $secTag <-orient $x1 $x2 $x3 $yp1 $yp2 $yp3> <-doRayleigh $rFlag>
equalDOF $rNodeTag $cNodeTag $dof1 $dof2 ...
exit
fixX $xCoordinate (ndf $ConstrValues) <-tol $tol>
fixY $yCoordinate (ndf $ConstrValues) <-tol $tol>
frictionModel Coulomb $frnTag $mu
frictionModel VelDepMultiLinear $frnTag -vel $velocityPoints -frn $frictionPoints
frictionModel VelDependent $frnTag $muSlow $muFast $transRate
frictionModel VelPressureDep $frnTag $muSlow $muFast0 $A $deltaMu $alpha $transRate
frictionModel frnMdlType? arg1? ...
geomTransf Corotational $transfTag <-jntOffset $dXi $dYi $dXj $dYj>
geomTransf Linear $transfTag <-jntOffset $dXi $dYi $dXj $dYj>
geomTransf PDelta $transfTag <-jntOffset $dXi $dYi $dXj $dYj>
getTime
groundMotion type? arg1? ...
imposedMotion $nodeTag $dirn $gMotionTag
integrator ArcLength $s $alpha
integrator CentralDifference
integrator DisplacementControl $node $dof $incr <$numIter $<span class="texhtml">&Delta;<i>U</i>min</span> $<span class="texhtml">&Delta;<i>U</i>max</span>>
integrator GeneralizedAlpha $alphaM $alphaF <$gamma $beta>
integrator HHT $alpha <$gamma $beta>
integrator MinUnbalDispNorm $dlambda1 <$Jd $minLambda $maxLambda>
integrator Newmark $gamma $beta
integrator TRBDF2
limitCurve $type $arg1 $arg2 ...
loadConst <-time $pseudoTime>
mass $nodeTag (ndf $massValues)
model BasicBuilder -ndm $ndm <-ndf $ndf>
nDMaterial Damage2p $matTag $fcc <-fct $fct> <-E $E> <-ni $ni> <-Gt $Gt> <-Gc $Gc> <-rho_bar $rho_bar> <-H $H> <-theta $theta> <-tangent $tangent>
nDMaterial ElasticIsotropic $matTag $E $v <$rho>
nDMaterial ElasticOrthotropic $matTag $Ex $Ey $Ez $vxy $vyz $vzx $Gxy $Gyz $Gzx <$rho>
nDMaterial InitialStateAnalysisWrapper $matTag $nDMatTag $nDim
nDMaterial PlaneStrain $matTag $threeDtag
nDMaterial PlaneStress $matTag $threeDtag
nDMaterial PlateFiber $matTag $threeDTag
nDMaterial RAFourSteelRCPlaneStress matTag? rho? UniaxiaMatTag1? UniaxiaMatTag2? UniaxiaMatTag3? UniaxiaMatTag4? UniaxiaMatTag5? UniaxiaMatTag6? angle1? angle2? angle3? angle4? rou1? rou2? rou3? rou4? fpc? fy? E0? epsc0?
nDmaterial CycLiqCP $matTag $G0 $kappa $h $Mfc $dre1 $Mdc $dre2 $rdr $alpha $dir $ein <$rho>
nDmaterial DruckerPrager $matTag $k $G $sigmaY $rho $rhoBar $Kinf $Ko $delta1 $delta2 $H $theta $density <$atmPressure>
nDmaterial J2Plasticity $matTag $K $G $sig0 $sigInf $delta $H
ndMaterial matType? arg1? ...
node $nodeTag (ndm $coords) <-mass (ndf $massValues)>
nodeAccel $nodeTag <$dof>
nodeCoord $nodeTag <$dim>
nodeDisp $nodeTag <$dof>
nodeEigenvector $nodeTag $eigenvector <$dof>
nodeVel $nodeTag <$dof>
numberer AMD
numberer Plain
numberer RCM
numberer numbererType? arg1? ...
pattern patternType? arg1? ...
print <$fileName>
rayleigh $alphaM $betaK $betaKinit $betaKcomm
record
recorder plot $fileName $windowTitle $xLoc $yLoc $xPixels $yPixels -columns $xCol0 $yCol0 <-columns $xCol1 $yCol1>  ...
recorder recorderType? arg1? ...
region $regTag <-ele ($ele1 $ele2 ...)> <-eleRange $startEle $endEle>  <-node ($node1 $node2 ...)> <-nodeRange $startNode $endNode> <-node all> <-rayleigh $alphaM $betaK $betaKinit $betaKcomm>
reset
restore $commitTag
rigidDiaphragm $perpDirn $masterNodeTag $slaveNodeTag1 $slaveNodeTag2 ...
rigidLink $type $masterNodeTag $slaveNodeTag
save $commitTag
section secType? secTag? arg1? ...
setMaxOpenFiles $maxNumFiles
setTime $pseudoTime
system SparseGEN
system SparseSYM
system systemType? arg1? ...
test EnergyIncr $tol $iter <$pFlag> <$nType>
test FixedNumIter $iter <$pFlag> <$nType>
test NormDispIncr $tol $iter <$pFlag> <$nType>
test RelativeEnergyIncr $tol $iter <$pFlag> <$nType>
test RelativeNormDispIncr $tol $iter <$pFlag> <$nType>
test RelativeNormUnbalance $tol $iter <$pFlag> <$nType>
test RelativeTotalNormDispIncr $tol $iter <$pFlag> <$nType>
test testType? arg1? ...
testIter
testNorms
timeSeries Constant $tag <-factor $cFactor>
timeSeries Linear $tag? <-factor $cFactor>
timeSeries Path $tag -dt $dt -values {list_of_values} <-factor $cFactor>
timeSeries PeerMotion $tag $eqMotion $station $type $factor <-dT $dT> <-nPTS $nPts>
timeSeries PeerNGAMotion $tag $eqMotion $factor <-dT $dT> <-NPTS $nPts>
timeSeries Pulse $tStart $tEnd $period <-width $pulseWidth> <-shift $shift> <-factor $cFactor>
timeSeries Rectangular $tag $tStart $tEnd? <-factor $cFactor>
timeSeries Triangle $tag $tStart $tEnd $period <-shift $shift> <-factor $cFactor>
timeSeries Trig $tag $tStart $tEnd $period <-factor $cFactor> <-shift $shift>
timeSeries seriesType? arg1? ...
uniaxialMaterial BarSlip $matTag $fc $fy $Es $fu $Eh $db $ld $nb $depth $height <$ancLratio> $bsFlag $type <$damage $unit>
uniaxialMaterial Bilin  $matTag  $K0  $as_Plus  $as_Neg  $My_Plus  $My_Neg  $Lamda_S  $Lamda_C  $Lamda_A  $Lamda_K  $c_S  $c_C  $c_A  $c_K  $theta_p_Plus  $theta_p_Neg  $theta_pc_Plus  $theta_pc_Neg  $Res_Pos  $Res_Neg  $theta_u_Plus  $theta_u_Neg  $D_Plus  $D_Neg <$nFactor>
uniaxialMaterial Bond_SP01 $matTag $Fy $Sy $Fu $Su $b $R
uniaxialMaterial Cast  $matTag  $n $bo $h $fy $E $L $b $Ro $cR1 $cR2 <$a1 $a2 $a3 $a4>
uniaxialMaterial Concrete01 $matTag $fpc $epsc0 $fpcu $epsU
uniaxialMaterial Concrete01WithSITC $matTag $fpc $epsc0 $fpcu $epsU <$endStrainSITC>
uniaxialMaterial Concrete02 $matTag $fpc $epsc0 $fpcu $epsU $lambda $ft $Ets
uniaxialMaterial Concrete04 $matTag $fc $ec $ecu $Ec <$fct $et> <$beta>
uniaxialMaterial Concrete06 $matTag $fc $e0 $n $k $alpha1 $fcr $ecr $b $alpha2
uniaxialMaterial Concrete07 $matTag $fc $ec $Ec $ft $et $xp $xn $r
uniaxialMaterial ConfinedConcrete01 $tag $secType $fpc $Ec (<-epscu $epscu>  OR <-gamma $gamma>)  (<-nu $nu> OR <-varub> OR <-varnoub>) $L1 ($L2) ($L3) $phis $S $fyh $Es0 $haRatio $mu $phiLon <-internal $phisi $Si $fyhi $Es0i $haRatioi $mui> <-wrap $cover $Am $Sw $fuil $Es0w> <-gravel> <-silica> <-tol $tol> <-maxNumIter $maxNumIter> <-epscuLimit $epscuLimit> <-stRatio $stRatio>
uniaxialMaterial Dodd_Restrepo $tag $Fy $Fsu $ESH $ESU $Youngs $ESHI $FSHI <$OmegaFac>
uniaxialMaterial ECC01 $matTag $sigt0 $epst0 $sigt1 $epst1 $epst2 $sigc0 $epsc0 $epsc1 $alphaT1 $alphaT2 $alphaC $alphaCU $betaT $betaC
uniaxialMaterial ENT $matTag $E
uniaxialMaterial ElasticBilin $matTag $EP1 $EP2 $epsP2 <$EN1 $EN2 $epsN2>
uniaxialMaterial ElasticPP $matTag $E $epsyP <$epsyN $eps0>
uniaxialMaterial ElasticPPGap $matTag $E $Fy $gap <$eta> <damage>
uniaxialMaterial Fatigue $matTag $tag <-E0 $E0> <-m $m> <-min $min> <-max $max>
uniaxialMaterial Hardening $matTag $E $sigmaY $H_iso $H_kin <$eta>
uniaxialMaterial HyperbolicGapMaterial $matTag $Kmax $Kur $Rf $Fult $gap
uniaxialMaterial Hysteretic $matTag $s1p $e1p $s2p $e2p <$s3p $e3p> $s1n $e1n $s2n $e2n <$s3n $e3n> $pinchX $pinchY $damage1 $damage2 <$beta>
uniaxialMaterial ImpactMaterial $matTag $K1 $K2 $δy $gap
uniaxialMaterial InitStrainMaterial $matTag $otherTag $initStrain
uniaxialMaterial InitStressMaterial $matTag $otherTag $initStress
uniaxialMaterial LimitState $matTag $s1p $e1p $s2p $e2p $s3p $e3p $s1n $e1n $s2n $e2n $s3n $e3n $pinchX $pinchY
uniaxialMaterial MinMax $matTag $otherTag <-min $minStrain> <-max $maxStrain>
uniaxialMaterial ModIMKPeakOriented  $matTag  $K0  $as_Plus  $as_Neg  $My_Plus  $My_Neg  $Lamda_S  $Lamda_C  $Lamda_A  $Lamda_K  $c_S  $c_C  $c_A  $c_K  $theta_p_Plus  $theta_p_Neg  $theta_pc_Plus  $theta_pc_Neg  $Res_Pos  $Res_Neg  $theta_u_Plus  $theta_u_Neg  $D_Plus  $D_Neg
uniaxialMaterial ModIMKPinching  $matTag  $K0  $as_Plus  $as_Neg  $My_Plus  $My_Neg  $FprPos $FprNeg $A_pinch $Lamda_S  $Lamda_C $Lamda_A  $Lamda_K  $c_S  $c_C  $c_A  $c_K  $theta_p_Plus  $theta_p_Neg  $theta_pc_Plus  $theta_pc_Neg  $Res_Pos  $Res_Neg  $theta_u_Plus  $theta_u_Neg  $D_Plus  $D_Neg
uniaxialMaterial Parallel $matTag $tag1 $tag2 ...
uniaxialMaterial Pinching4 $matTag $ePf1 $ePd1 $ePf2 $ePd2 $ePf3 $ePd3 $ePf4 $ePd4 <$eNf1 $eNd1 $eNf2 $eNd2 $eNf3 $eNd3 $eNf4 $eNd4> $rDispP $rForceP $uForceP <$rDispN $rForceN $uForceN > $gK1 $gK2 $gK3 $gK4 $gKLim $gD1 $gD2 $gD3 $gD4 $gDLim $gF1 $gF2 $gF3 $gF4 $gFLim $gE $dmgType
uniaxialMaterial PyLiq1 $matTag $soilType $pult $Y50 $Cd $c $pRes $ele1 $ele2
uniaxialMaterial PySimple1 $matTag $soilType $pult $Y50 $Cd <$c>
uniaxialMaterial QzSimple1 $matTag $qzType $qult $Z50 <$suction $c>
uniaxialMaterial RambergOsgoodSteel $matTag $fy $E0 $a $n
uniaxialMaterial ReinforcingSteel $matTag $fy $fu $Es $Esh $esh $eult  < -GABuck $lsr $beta $r $gama > < -DMBuck $lsr < $alpha >>  < -CMFatigue $C<sub class="subscript">f</sub> $alpha $C<sub class="subscript">d</sub> > < -IsoHard <$a1 <$limit> > >
uniaxialMaterial SAWS $tag $F0 $FI $DU $S0 $R1 $R2 $R3 $R4 $alph $beta
uniaxialMaterial SelfCentering $matTag $k1 $k2 $sigAct $beta <$epsSlip> <$epsBear> <rBear>
uniaxialMaterial Series $matTag $tag1 $tag2 ...
uniaxialMaterial TzLiq1 $matTag $tzType $tult $z50 $c $ele1 $ele2
uniaxialMaterial TzSimple1 $matTag $tzType $tult $z50 <$c>
uniaxialMaterial Viscous $matTag $C $alpha
uniaxialMaterial ViscousDamper  $matTag  $K $Cd $alpha
uniaxialMaterial matType? matTag? arg1? ...
wipeAnalysis

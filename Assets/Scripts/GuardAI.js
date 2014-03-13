#pragma strict
import SimpleJSON;

var target : Transform;  //the player
var speed : float;  // the speed
var controller : CharacterController;
var aiDetectionRange : float;
var meleeRange : float;
var canMove : boolean ; // only for archers
var isPeace : boolean;

var Weapons: GameObject[];
var ArrowPrefab : GameObject;
var ArrowNum : int;
var Accuracy : float;

private var weaponInfo : Array;
private var currentWeapon : float[];
private var distance : float;
private var weaponRange : float;
private var timer : float;
private var isPC : boolean;
private var weapon_index : int = 0;

function Start(){
    controller = gameObject.GetComponent(CharacterController);
    
    // get weapon list
    var weaponlist = JSON.Parse(Resources.Load("Weapon List", TextAsset).text);

	// get weapons info
    weaponInfo = new Array(); 
	for (var i = 0; i < Weapons.length; i++) {
		var info = new Array();
		info[0] = weaponlist[Weapons[i].name]["id"].AsInt;
		info[1] = weaponlist[Weapons[i].name]["type"].AsInt;
		info[2] = weaponlist[Weapons[i].name]["range"].AsFloat;
		info[3] = weaponlist[Weapons[i].name]["period"].AsFloat;
		info[4] = weaponlist[Weapons[i].name]["damage"].AsFloat;
		info[5] = weaponlist[Weapons[i].name]["arrow_velocity"].AsFloat;
		weaponInfo[i] = info;							
	}
	
	// set the current weapon 
	// the first is main weapon and the second is sub weapon. 
	
	currentWeapon = weaponInfo[weapon_index];
	SelectWeapon(weapon_index);

}

function Update(){
	//Debug.Log(currentWeapon[0]+","+currentWeapon[1]+","+currentWeapon[2]+","+
	//			currentWeapon[3]+","+currentWeapon[4]+","+currentWeapon[5]);
	
    // distance between NPC and PC
    distance = Vector3.Distance(target.transform.position,transform.position);
    weaponRange = currentWeapon[2];
    
    if (isPeace) {
    	//nothing... maybe chat? 
    } 
    else {
    	transform.LookAt(target);  // lookat the player
 		
 		// if target (can move) in aiDetectionRange but out of weapon range, then move forward.
 		// SO, weaponRange < aiDetectionRange
 		if ( canMove && distance < aiDetectionRange && distance > weaponRange) {
	    	controller.SimpleMove(speed*transform.forward);
 		}
 		
 		// detect object in front.
	 	var fwd = transform.TransformDirection(Vector3.forward);
 		var hit : RaycastHit;
 		Debug.DrawRay(transform.position, fwd * aiDetectionRange, Color.green);
 
 		if( Physics.Raycast (transform.position, fwd, hit, weaponRange) && hit.collider.tag == "Player") {
			isPC = true;
		} else {
	 		isPC = false;
 		}
 		
 		// attack by different weapons
 		// one-handed : 1;  two-handed : 2
 		if (currentWeapon[1] == 1 || currentWeapon[1] == 2) {
 			Melee ();
 		}
 		 
 		// Archery : 3
 		else if (currentWeapon[1] == 3) {
 			// Debug.Log (timer);
 			timer += Time.deltaTime; // weapon cooltime
 			// Debug.Log (currentWeapon[3]);
 			
 			if ( (distance <= weaponRange) && (timer > currentWeapon[3] * (2 - Accuracy)) 
 				&& isPC && (ArrowNum > 0)) {
			
		 		// fireToPC ();
		 		var distance_y = target.position.y - transform.position.y;

				// calculate angle
		 		var a = ((distance * distance - distance_y * distance_y) * Physics.gravity.magnitude + 
		 				currentWeapon[5] * currentWeapon[5] * distance_y) / (currentWeapon[5] * currentWeapon[5] * distance);
		 		var aRad = Mathf.Asin(a);
		 		
		 		var distanceRad = Mathf.Asin(distance_y / distance);
		 		var angleRad = (aRad + distanceRad) / 2;
		 		
		 		// change to degree and random rotation
		 		var angle = (angleRad - distanceRad) * 180 / Mathf.PI;
		 		//print (angle);
		 		
		 		var acc = 1 - Accuracy;
		 		var x = Random.Range(-1 - acc, -1 + acc);
		 		var y = Random.Range (-acc, acc);
		 		var z = Random.Range (-acc, acc);
		 		//print(x + "," + y + "," +z);
		 		var weaponObject = transform.Find(Weapons[0].name);
		 		weaponObject.LookAt(target);
		 		weaponObject.Rotate(Vector3(x, y, z) * angle);
		 		
				// create the arrow
				var arrow : GameObject = Instantiate(ArrowPrefab, weaponObject.position, weaponObject.rotation);
				arrow.rigidbody.velocity = arrow.transform.forward * currentWeapon[5];
				
				timer = Random.Range(-1,0);
				ArrowNum--;
			}
			// if out of range, change melee wepaon.
			if (ArrowNum == 0 || distance <= meleeRange) {
				weapon_index ++;
				canMove = true;
				currentWeapon = weaponInfo[weapon_index];
				SelectWeapon(weapon_index);
			}
 			
 		}
 		
 		// Magic : 4
 		else if (currentWeapon[1] == 4) {
 			Magic ();
 		}
 		else {
 			// do something, maybe escape?
 		}
 		
    }

 	
 	
 	
 	

 	
 	// if in range, fire.

}

function SelectWeapon(index : int) {
	for (var i = 0 ;i < Weapons.length; i++)	{
		// Activate the selected weapon
		if (i == index) {
			transform.Find(Weapons[i].name).gameObject.SetActive(true);
		}
		// Deactivate all other weapons
		else {
			transform.Find(Weapons[i].name).gameObject.SetActive(false);
		}
	}
}


function Melee () {

}

function Magic () {

}
#pragma strict

function OnTriggerEnter (other : Collider) {
	if(other.gameObject.name == "Door2Outside"){
		Application.LoadLevel("NPCtown");
	}
}
